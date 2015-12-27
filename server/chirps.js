var router    = require('express').Router;
var LocallyDB = require('locallydb');

var login     = require('./login');

var db    = new LocallyDB('./.data');
var chirps = db.collection('chirps');

router = router();
router
  .route('/api/chirps')
    .all(login.required)
    .get(function (req, res) {
      res.json(chirps.toArray());
    })
    .post(function (req, res) {
      var chirp = req.body;
      chirp.userId = req.user.cid;

      // to be removed
      chirp.username = req.user.username;
      chirp.name     = req.user.name;
      chirp.email    = req.user.email;

      var id = chirps.insert(chirp);
      return res.json(chirps.get(id));
    });

module.exports = router;
