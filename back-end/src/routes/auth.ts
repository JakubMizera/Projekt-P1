import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();
//Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

router.get('/auth/google/callback',
  passport.authenticate('google',
    { failureRedirect: 'http://localhost:4200/login' }), (req: Request, res: Response) => {
      res.redirect('http://localhost:4200/user');
    });
//Facebook
 router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
  
router.get('/auth/facebook/callback',
   passport.authenticate('facebook',
      { failureRedirect: 'http://localhost:4200/login' }), (req: Request, res: Response) => {
        res.redirect('http://localhost:4200/user');
      });
router.get('/auth/check', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true })
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
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error', err);
        return res.status(500).json({ message: 'Internal server error'});
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
  
});

export default router;