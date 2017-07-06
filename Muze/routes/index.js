var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Muze' , user: req.user });
});

router.get('/signup',function(req, res){
  res.render('signup', { });
});

router.post('/signup', function(req, res){
  Account.register(new Account({ username : req.body.username, email : req.body.email, name: req.body.name }), req.body.password, function(err, account){
      if (err) {
        return res.render('signup', { account : account });
      }
      passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/signup',
                                    failureFlash: true })
      });
  });

router.get('signin', function(req, res){
  res.render('signin', { user : req.user });
});

router.post('/signin', passport.authenticate('local', { successRedirect: '/',
                              failureRedirect: '/signup',
                              failureFlash: true })
);

router.get('/signout', function(req, res){
  req.signout();
  res.redirect('/');
});

module.exports = router;
