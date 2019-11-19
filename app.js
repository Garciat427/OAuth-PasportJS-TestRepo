const express = require ('express')
const passportSetup = require('./config/passport-setup')
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport');

const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')

//Set up view engine

app.set('view engine', 'ejs')

app.use(cookieSession({
   maxAge: 24*60*60*1000, //day in milliseconds
   keys:[keys.session.cookieKey]
}))

//init passport
app.use(passport.initialize())
app.use(passport.session())


//Connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, ()=>{
   console.log('connected to mongodb')
})

//set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)


//Create home route
app.get('/', (req,res) => {
   res.render('home', {user:req.user});
})

app.listen(3000, () => {
   console.log ('app now listening for requests on port 3000')
})