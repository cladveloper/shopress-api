// Packages
const express = require('express');
const passport = require('passport');
const router = express.Router();
const {authenticate} = require('./responses');
const validationHandler = require('../../utils/middlewares/validationHandler');
const {authSchema} = require('../users/schemas');

require('../../utils/strategies/local');
require('../../utils/strategies/jwt');
router.post('/', validationHandler(authSchema), authenticate(passport) );
router.get('/', passport.authenticate('jwt', { session: false }), (req,res,next) => {
    res.json({user: req.user});
} );

module.exports = router;