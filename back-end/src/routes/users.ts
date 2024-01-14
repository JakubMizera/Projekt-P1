import express, { NextFunction, Request, Response } from 'express';
import { User } from './../models/User';
import { IUser } from './../models/User';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

// Current user
router.get('/users/current', isAuthenticated, (req: Request, res: Response) => {
  const user = req.user as IUser;
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    _id: user._id,
    googleId: user.googleId,
    displayName: user.displayName,
    email: user.email,
    picture: user.picture,
    name: user.name,
    surname: user.surname,
    role: user.role,
    phoneNumber: user.phoneNumber,
  });
})

// Get all users
router.get('/users', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get user by ID
router.get('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new user
router.post('/users', isAuthenticated, async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update user
router.put('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete user
router.delete('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;