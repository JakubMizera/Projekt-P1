import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from './../models/User';
import dotenv from 'dotenv';
import { UserRole } from '../interfaces/UserRole';

dotenv.config();

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/api/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in database
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }
      // If not, create a new user in database
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        picture: profile.photos?.[0]?.value,
        name: profile.name?.givenName,
        surname: profile.name?.familyName,
        role: UserRole.User,
      });
      await user.save();
      done(null, user);
    } catch (error: any) {
      done(error);
    }
  }
));

// Serialize User
passport.serializeUser((user: any, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
