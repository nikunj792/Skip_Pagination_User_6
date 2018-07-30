const assert = require('assert');
const User = require('../src/user');

describe('Updating the Records',()=>{
    let joe;
    beforeEach((done)=>{
        joe = new User({
            name:'Nikki',
            likes:20
        });
        joe.save()
            .then(()=>{
                done();
            });
    });

    function assertName(operation, done){
        operation
        .then(()=>{
            User.find({})
        .then((users)=>{
            assert(users.length ===1);
            assert(users[0].name==='Agarwal');
            done();
        });
    })
    }

    it('Instance Set and Save',(done)=>{
        joe.set({name:'Agarwal'});
        assertName(joe.save(), done)
           
    })

    it('A Model Instance Can Update',(done)=>{
        assertName(joe.update({name:'Agarwal'}), done);
    })

    it('A model class can Update',(done)=>{
        assertName(User.update({name:'Nikki'},{name:'Agarwal'}),done);
    })

    it('A model class can update one record',(done)=>{
        assertName(User.findOneAndUpdate({name:'Nikki'},{name:'Agarwal'}),done);
    })

    it('A model class can a find a record with an Id and update',(done)=>{
        assertName(User.findByIdAndUpdate(joe._id,{name:'Agarwal'}),done);
    })
//x in front of it , means that test need not to run.
    it('Incrementing the likes by 1',(done)=>{
        User.update({name:'Nikki'},{$inc:{likes: 1}})
            .then(()=>User.findOne({name:'Nikki'}))
            .then((users)=>{
                        assert(users.likes === 21);
                        done();
                    });
    });
});