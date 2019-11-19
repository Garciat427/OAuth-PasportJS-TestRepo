const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done)=>{
   done(null, user.id)
})

passport.deserializeUser((id, done)=>{
   User.findById(id).then((user)=>{
      done(null, user)
   })
})

passport.use(
   new GoogleStrategy({
      //Options for Google strat
      callbackURL:'/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
   } , (accessToken, refreshToken, profile, done) => {
      
      //Check if user exists in db
      User.findOne({googleID: profile.id}).then((currentUser)=>{
         if (currentUser){
            //Already have user
            console.log('user is: ' + currentUser)
            done(null, currentUser)

         } else{
            //If not, create new user in db
            new User ({
               username: profile.displayName,
               googleID: profile.id
            }).save().then((newUser) => {
               console.log('new user created: ' + newUser)
               done(null, newUser)
            })
         }
      })

      console.log('passport callback fired')
      console.log(profile)
      
   })
)