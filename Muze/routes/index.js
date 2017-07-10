var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Muze' });
});

router.get('/signup',function(req, res){
  res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.get('/signin', function(req, res){
  res.render('signin', { message: req.flash('loginMessage') });
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: 'signin',
  failureFlash: true,
}));

router.get('/profile', isLoggedIn, function(req,res) {
  res.render('profile', { user: req.user });
});

router.get('/signout', function(req, res){
  req.signout();
  res.redirect('/');
});

// router.get('signin/facebook',
//   passport.authenticate('facebook'));
//
// router.get('signin/facebook/return',
//   passport.authenticate('facebook', { failureRedirect: '/signin'}),
//   function(req, res){
//     res.redirect('/');
//   });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
    res.redirect('/')
}
module.exports = router;
