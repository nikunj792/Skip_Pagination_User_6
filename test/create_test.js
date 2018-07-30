const assert = require('assert');
const User = require('../src/user');

describe('Creating Records',()=>{
    it('dummy',()=>{
        assert(1+1 ===2);
    });

    it('saves a user',(done)=>{
        const joe = new User({ name:'Joe' });
        joe.save()
        .then(()=>{
            //Has Joe been saved successfully
            // assert(joe.isNew===false);
            assert(!joe.isNew);
            done();
        })
        .catch(()=>{

        });
    });
});
