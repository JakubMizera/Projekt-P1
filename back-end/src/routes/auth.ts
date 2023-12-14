import express from 'express';
import passport from 'passport';

const router = express.Router();

// Route to start authentication with Google
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login', // Redirect to login page upon failure
  successRedirect: '/' // Redirect to home page upon success
}));

export default router;
