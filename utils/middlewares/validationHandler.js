const boom = require('@hapi/boom');

function validate(data, schema) {
  return schema.validate(data);
};

function setValues(values, check, req, next){
  req[check] = values;
  next();
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const result = validate(req[check], schema);
    result.error ? next(boom.badRequest(result.error)) : setValues(result.value, check, req, next);
  };
}

module.exports = validationHandler;