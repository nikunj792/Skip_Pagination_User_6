const assert = require('assert');
const User = require('../src/user');

describe('SubDocument Functioning',()=>{

    beforeEach((done)=>{
        const joe = new User({
            name:'Nikunj',
            posts: [{title:'Hello'},{title:'World'}]
       });
        joe.save().then(()=>done());
    });

    it('Can create a Sub Document',(done)=>{
         User.findOne({name:'Nikunj'})
            .then((users)=>{
                 assert(users.posts[0].title === 'Hello');
                 done();
         });
    });

    it('Can Add subdocuments to an existing Record',(done)=>{
        const joe = new User({
            name:'Nikunj',
            posts: [{title:'Hello'},{title:'World'}]
       });
        joe.save().then(()=>User.findOne({name:'Nikunj'}))
            .then((users)=>{
                users.posts.push({title:'Priyanka'});
               return users.save();
            })
            .then((user)=>{
                assert(user.posts[2].title === 'Priyanka');
                done();
            });
    });

    it('Removing the SubDocument from the Record',(done)=>{
        const joe = new User({
            name:'Nikunj',
            posts: [{title:'Hello'}]
       });
        joe.save().then(()=>User.findOne({name:'Nikunj'}))
            .then((users)=>{
                const post = users.posts[0];
                post.remove();
               return users.save();
            })
            .then((user)=>{
                assert(user.posts[0].title !== 'Hello');
                done();
            });
    })
});