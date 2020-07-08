const Joi = require('@hapi/joi');
const {ObjectId} = require('mongodb');

const mongoJoi = Joi.extend((joi) => ({
    type: 'transform',
    base: joi.string(),
    messages: {
        'notAllowed': '"{{#value}}" is not allowed in {{#label}}',
        'notObjectId': '"{{#value}}" is not a MongoDB Object Id in {{#label}}',
    },
    rules: {
        project: {
            method(...values) {
                return this.$_addRule({ name: 'project', args: {values} });
            },
            validate(value,helpers,args){
                if(typeof value !== undefined || value.length > 0){
                    value = value.replace(/^,+|,+$/mg, '').split(',');
                    let arr = {};
                    let err = false;
                    let val = '';
                    value.forEach(element => {
                        if(!args.values.includes(element)){
                            err = true;
                            val = element;
                        } else{
                            arr[element] = 1;
                        }
                    });
                    if(err) return helpers.error('notAllowed', {value: val});
                    return arr;
                }
            }
        },
        sort: {
            method(...values) {
                return this.$_addRule({ name: 'sort', args: {values} });
            },
            validate(value, helpers, args){
                if(typeof value !== undefined || value.length > 0){
                    if(!args.values.includes(value)) return helpers.error('notAllowed', {value});
                    if(value.slice(0,1) == '-'){
                        const val = value.slice(1, value.length);
                        return {[val]: -1}
                    } else{
                        return {[value]: 1}
                    }
                }
            }
        },
        objectIdArray: {
            method(...values) {
                return this.$_addRule({ name: 'objectIdArray', args: {values} });
            },
            validate(value,helpers,args){
                if(typeof value !== undefined || value.length > 0){
                    let values = value.replace(/^,+|,+$/mg, '').split(',');
                    let arr = [];
                    let val = '';
                    let err = false;
                    values.forEach(value => {
                        if(/^[a-fA-F0-9]{24}$/.test(value)){
                            arr.push(ObjectId(value));
                        } else{
                            err = true;
                            val = value;
                        }
                    });
                    if(err) return helpers.error('notObjectId', {value: val});
                    else return arr;
                }
            }
        },
    }
}));

module.exports = {
    mongoJoi
}