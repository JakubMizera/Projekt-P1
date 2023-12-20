import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './../models/User';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in your database
      console.log(accessToken);
      console.log(profile);
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(undefined, user);
      }
      // Extract email from profile if available
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found from Google profile.'));
      }
      // If not, create a new user in your database
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: email,
      });
      await user.save();
      done(undefined, user);
    } catch (error: any) {
      done(error);
    }
  }
));

// Serialize User
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// // Deserialize User
// passport.deserializeUser((id, done) => {
//   User.findById(id as mongoose.Types.ObjectId, (err: any, user: any) => {
//     done(err, user);
//   });
// });
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

