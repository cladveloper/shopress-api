const boom = require('@hapi/boom');
const {config} = require('../../config');
const jwt = require('jsonwebtoken');

const authenticate = (passport) => {
    return (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {

            if(err || !user){
                next(next(boom.unauthorized()));
            } else{
                if(err) return next(boom.unauthorized());
        
                const token = jwt.sign(user, config.authJwtSecret, {
                    expiresIn: '1h'
                });
        
                res.status(200).json({
                    user,
                    token
                });
                
            }
      })(req, res, next);
    }
  };

module.exports = {
    authenticate
}