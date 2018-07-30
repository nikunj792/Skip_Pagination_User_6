const assert = require('assert');
const User = require('../src/user');

describe('Reading User Out of DateBase',(done)=>{
    let joe, maria, zach, alex;
    beforeEach((done)=>{
        joe = new User({name:'Nikunj'});
        alex = new User({ name :'Alex'});
        maria = new User({ name: 'Maria'});
        zach = new User({ name: 'Zach'});

        Promise.all([joe.save(), alex.save(),maria.save(), zach.save()])
        .then(()=>done());
    });

    it('Find All User By Name of Nikunj',(done)=>{
         User.find({name:'Nikunj'})
            .then((users)=>{
             console.log(`db id is ${users[0].id} and joe id is ${joe._id}`);
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('Find Particular User By ID',(done)=>{
        User.findOne({_id: joe._id})
           .then((users)=>{
               assert(users.name === 'Nikunj');
               done();
           });
   });
//Query Modifier Skip and limit for pagination.
   it('Can skip and limit the result set',(done)=>{
       //This will skip the 1st result and limit 2 after that.
       //Sort will take object in which 1 stands for ascending and -1 for decending.
        User.find({})
        .sort({
            name: 1
        })
        .skip(1)
        .limit(2)
        .then((users)=>{
            assert(users.length ===2);
            assert(users[0].name === 'Maria');
            done();
        })
   });
});