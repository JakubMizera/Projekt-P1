import express, { Request, Response } from 'express';
import Course from '../models/Course';
import { checkCourseOwner } from '../middleware/checkCourseOwner';
import { isAuthenticated } from '../middleware/isAuthenticated';
const { validateCourse, validate } = require('../middleware/validation');

const router = express.Router();

// Pobieranie wszystkich kursów
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
});

// Pobieranie kursu po id
router.get('/courses/:id', async (req: Request, res: Response) => {
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

//Pobieranie wszystkichj kursów użytkownika
router.get('/courses/user/:userId', async (req: Request, res: Response) => {
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

// Aktualizacja istniejącego kursu
router.put('/courses/:id', isAuthenticated, checkCourseOwner, async (req, res) => {
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
router.delete('/courses/:id', async (req, res) => {
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