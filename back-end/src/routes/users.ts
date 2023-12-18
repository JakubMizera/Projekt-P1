// routes/users.js
import express, { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
const router = express.Router();
const { validateUser, validate } = require('../middleware/validation');

// Dodawanie nowego użytkownika
router.post('/users', validateUser, validate, async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', err });
    }
});

// Pobieranie listy użytkowników
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', err });
    }
});

// Aktualizacja użytkownika
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', err });
    }
});

// Usuwanie użytkownika
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully deleted', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', err });
    }
});

export default router;
