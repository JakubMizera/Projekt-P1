import express, { Request, Response } from 'express';
import Course from '../models/Course';

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

// Dodawanie nowego kursu
router.post('/courses', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: 'Error creating course' });
    }
});

// Aktualizacja istniejącego kursu
router.put('/courses/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (err) {
        res.status(500).json({ message: 'Error updating course' });
    }
});
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
