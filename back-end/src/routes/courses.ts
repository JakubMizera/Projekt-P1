import express, { Request, Response } from 'express';
import Course from '../models/Course';
import { checkCourseOwner } from '../middleware/checkCourseOwner';
import { isAuthenticated } from '../middleware/isAuthenticated';
const { validateCourse, validate } = require('../middleware/validation');
import { updateCourseStatus } from '../middleware/updateCourseStatus';
import { User } from '../models/User';

const router = express.Router();

// Pobieranie wszystkich kursów
router.get('/courses', updateCourseStatus, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
});

// Pobieranie kursu po id
router.get('/courses/:id', updateCourseStatus, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: `Cannot find course with id: ${id}` });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error getting course' });
  }
});

// Pobieranie wszystkich kursów użytkownika
router.get('/courses/user/:userId', isAuthenticated, updateCourseStatus, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userCourses = await Course.find({ createdBy: userId });
    res.json(userCourses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses for the user' });
  }
});


// Dodawanie nowego kursu
router.post('/courses', validateCourse, validate, async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: 'Error creating course', err });
  }
});

// Rezerwacja miejsca w kursie
router.post('/courses/:id/reserve', async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.body.userId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    if (!course.reservedUserIds) {
      course.reservedUserIds = [];
    }

    if (course.reservedUserIds.length >= course.courseCapacity) {
      return res.status(400).send({ message: 'Course is fully booked' });
    }

    if (course.reservedUserIds.includes(userId)) {
      return res.status(400).send({ message: 'User has already reserved a spot' });
    }

    course.reservedUserIds.push(userId);
    await course.save();

    res.status(200).send({ message: 'Reservation successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

// Rezygnacja rezerwacji miejsca w kursie
router.post('/courses/:id/unreserve', async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.body.userId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    if (!course.reservedUserIds) {
      course.reservedUserIds = [];
    }

    const index = course.reservedUserIds.indexOf(userId);
    if (index === -1) {
      return res.status(400).send({ message: 'User has not reserved a spot' });
    }

    course.reservedUserIds.splice(index, 1);
    await course.save();

    res.status(200).send({ message: 'Spot unreserved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

// Zwraca listę użytkowników zapisanych na kurs
router.get('/courses/:id/reservedUsers', checkCourseOwner, async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    if (!course.reservedUserIds) {
      course.reservedUserIds = [];
    }

    const users = await User.find({ '_id': { $in: course.reservedUserIds } });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

// Zwraca listę kursów na które użytkownik się zapisał
router.get('/courses/reserved/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const reservedCourses = await Course.find({ reservedUserIds: userId });

    res.status(200).json(reservedCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

// Aktualizacja istniejącego kursu
router.put('/courses/:id', isAuthenticated, checkCourseOwner, updateCourseStatus, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Error updating course' });
  }
});

// Usuwanie kursu
router.delete('/courses/:id', isAuthenticated, checkCourseOwner, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(deletedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

export default router;