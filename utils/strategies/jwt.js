const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

// Imports
const { config } = require('../../config');
const UsersService = require('../../app/users/services');
const userService = new UsersService();

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    function(tokenPayload, cb) {
      userService.findByUser(tokenPayload.username)
      .then((user) => cb(null, user))
      .catch((err) => cb(err, false))
    }
  )
);