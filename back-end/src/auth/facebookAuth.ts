import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/User'; 
import dotenv from 'dotenv';
import { UserRole } from '../interfaces/UserRole'; 

dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID as string,
    clientSecret: process.env.FACEBOOK_APP_SECRET as string,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'] 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        return done(null, user);
      }
      user = new User({
        facebookId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        picture: profile.photos?.[0]?.value,
        name: profile.name?.givenName,
        surname: profile.name?.familyName,
        role: UserRole.User, 
      });
      await user.save();
      done(null, user);
    } catch (error) {
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
