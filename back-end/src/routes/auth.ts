import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (res: Response, req: Request) => {
    res.redirect('/');
  }
);

export default router;