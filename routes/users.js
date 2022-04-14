var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

const Users = require('../models/users');
var authenticate = require('../authenticate');
const Alums = require('../models/alums');
const cors = require('./cors');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.options('*',cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
router.get('/', cors.corsWithOptions, function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  console.log(req.body);
  Users.register(new Users({ username: req.body.username, specialization: req.body.specialization, enrollment: req.body.enrollment, alumni: req.body.alumni ,description:req.body.description,featured:req.body.featured}), req.body.password, (err, user) => {

    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    }
    else {
      
        if (req.body.alumni) {
          Alums.create({ username: req.body.username, specialization: req.body.specialization, enrollment: req.body.enrollment, password: req.body.password ,description:req.body.description,featured: req.body.featured})
            .then((alum) => {
              console.log("Registered to alums database " + alum);
            }, err => {
              console.log(err);
            });
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!',user:user });
    }
  });
});

router.post('/login', cors.corsWithOptions, (req, res,next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }

    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not login user!' });
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      if(user.alumni)
      res.json({ success: true, status: 'Login Successful!', token: token ,alumni:true});
      else{
        res.json({ success: true, status: 'Login Successful!', token: token ,alumni:false});
      }
    });


  })(req, res, next);


});

router.get('/logout', cors.corsWithOptions, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

module.exports = router;
