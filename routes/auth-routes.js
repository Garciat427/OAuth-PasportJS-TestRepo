const router = require('express').Router();
const passport = require('passport')

//Auth Login
router.get('/login', (req,res) => {
   res.render('login');
})

//Auth logout
router.get('/logout', (req,res) =>{
   //Handle with passport
   req.logout();
   res.redirect('/')
})

//Auth with google
router.get('/google', passport.authenticate('google', {
   scope: ['profile']
}))

//Callback route for google
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
   //res.send(req.user)
   res.redirect('/profile/')
})

module.exports = router;