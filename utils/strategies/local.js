const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../../app/users/services');
const userService = new UserService();

passport.use(new LocalStrategy((username, password, done) => {
  userService.auth(username, password)
  .then((user) => {
    return done(null, user);
  })
  .catch(() => {
    return done(null, false, { message: 'Incorrect username.' });
  });
}))