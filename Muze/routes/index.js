var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Muze' , user: req.user });
});

router.get('/signup',function(req, res){
  res.render('signup', { });
});

router.post('/signup', function(req, res){
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, account){
      if (err) {
        return res.render('signup', { account : account });
      }
      passport.authenticate('local')(req, res, function () {
           res.redirect('/');
         });
  });
});

router.get('/signin', function(req, res){
  res.render('signin', { user : req.user });
});

router.post('/signin', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/signout', function(req, res){
  req.signout();
  res.redirect('/');
});

router.get('signin/facebook',
  passport.authenticate('facebook'));

router.get('signin/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/signin'}),
  function(req, res){
    res.redirect('/');
  });

module.exports = router;
