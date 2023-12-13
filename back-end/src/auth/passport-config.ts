import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
  (accessToken, refreshToken, profile, cb) => {
    // Here, you'd find or create a user in your database
    // For now, we'll just return the profile
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  // Here you would find the user by their id in the database
  // For now, we'll just pass the id through for example purposes
  done(null, user)
});

export default passport;
