const assert = require('assert');
const get = require('lodash/get');
const User = require('../src/user');


describe('Validating the Records',()=>{
    it('Requires a User Name',()=>{
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const message = get(validationResult,'errors.name.message');
        assert(message === 'Name is Required.');
    });

    it('User Name must be longer than 2 Characters',()=>{
        const user = new User({name: 'Ni'});
        const validationResult = user.validateSync();
        const message = get(validationResult,'errors.name.message');
        console.log("property is ", message);
        assert(message === 'Name must be longer than 2 character');
    });
});