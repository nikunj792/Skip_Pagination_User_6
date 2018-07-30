const assert = require('assert');
const User = require('../src/user');

describe('Virtual Type Test',()=>{

    it('postCount return the number of Posts',(done)=>{
        const joe = new User({
            name:'Nikunj',
            posts: [{title:'Hello'},{title:'Hello'}]
       });
        joe.save()
            .then(()=>User.findOne({name:'Nikunj'}))
            .then((user)=>{
                const length = user.posts.length;
                assert(length==2);
                done();
            })
    });

});