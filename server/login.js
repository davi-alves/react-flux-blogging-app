var crypto        = require('crypto');
var _             = require('lodash');
var router        = require('express').Router;
var bodyParser    = require('body-parser');
var passport      = require('passport');
var LocalStrategy = require('passport-local');
var LocallyDB     = require('locallydb');

var db    = new LocallyDB('./.data');
var users = db.collection('users');

var SAFE_USER_DATA = ['cid', 'name', 'email', 'username', 'following'];

/**
 * Create a hash for given password
 *
 * @param  {string} password pass
 * @return {string}          hashed pass
 */
var hash = function (password) {
  return crypto.createHash('sha512').update(password).digest('hex');
};

/**
 * Get a user by given username and password
 *
 * @param  {string} username username
 * @param  {string} password pass
 * @return {Object}          user object from db
 */
var getUserByUsernameAndPassword = function (username, password) {
  return users
    .where({username: username, passwordHash: hash(password)})
    .items[0];
};

var loginRequired = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

var makeUserSafe = function (user) {
  return _.pick(user, SAFE_USER_DATA);
};

// passport authentication strategy
passport.use(new LocalStrategy(function (username, password, done) {
  var user = getUserByUsernameAndPassword(username, password);

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

passport.serializeUser(function (user, done) {
  done(null, user.cid);
});

passport.deserializeUser(function (cid, done) {
  done(null, users.get(cid));
});

router = router();
router
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(require('cookie-parser')())
  .use(require('express-session')({
    secret: 'adfafadf08adf80ad8f8da0f0aafdad',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session());

router
// user list
  .get('/api/users', function (req, res) {
    res.json(users.toArray().map(makeUserSafe));
  })
  // user follow
  .post('/api/follow/:id', loginRequired, function (req, res) {
    var id = parseInt(req.params.id, 10);
    if (!_.includes(req.user.following, id)) {
      req.user.following.push(id);
      users.update(req.user.cid, req.user);
    }

    res.json(makeUserSafe(req.user));
  })
  // user unfollow
  .post('/api/unfollow/:id', loginRequired, function (req, res) {
    var id = parseInt(req.params.id, 10);
    if (_.includes(req.user.following, id)) {
      var userIndex = req.user.following.indexOf(id);
      req.user.following.splice(userIndex, 1);
      users.update(req.user.cid, req.user);
    }

    res.json(makeUserSafe(req.user));
  })
  // login page
  .get('/login', function (req, res) {
    return res.render('login');
  })
  .get('/logout', loginRequired, function (req, res) {
    req.logout();
    return res.redirect('/login');
  })
  // login action
  .post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }))
  // signup action
  .post('/signup', function (req, res, next) {
    var user = users
      .where({username: req.body.username})
      .items[0];

    if (user) {
      return res.redirect('/login');
    }

    user = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      passwordHash: hash(req.body.password),
      following: []
    };

    var id = users.insert(user);
    req.login(users.get(id), function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
  });

module.exports = {
  routes: router,
  safe: makeUserSafe,
  required: loginRequired
};
