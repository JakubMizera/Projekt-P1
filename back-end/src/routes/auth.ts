import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

router.get('/auth/google/callback',
  passport.authenticate('google',
    { failureRedirect: 'http://localhost:4200/login' }), (req: Request, res: Response) => {
      res.redirect('http://localhost:4200/user');
    });

router.get('/auth/check', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.status(200).json({ isAuthenticated: true, user: { user } })
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
})

router.post('/auth/logout', (req: Request, res: Response) => {
  req.logout(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

export default router;