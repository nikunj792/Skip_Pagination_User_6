const assert = require('assert');
const User = require('../src/user');

describe('Delete A Record',(done)=>{
    let joe;
    beforeEach((done)=>{
        joe = new User({ name : 'Nikki'});
        joe.save()
        .then(()=>{
            done()
        })
    })

    it('Model Instance Remove',(done)=>{
        joe.remove()
        .then(()=>{
            User.findOne({ name: 'Nikki'})
        .then((user)=>{
            assert(user===null);
            done();
        });
        });
    })

    it('Class Method Remove',(done)=>{
        //Remove a Bunch of Record with Some Given Criteria
        User.remove({ name: 'Nikki'})
            .then(()=>{
                User.findOne({name:'Nikki'})
                .then((users)=>{
                    assert(users===null);
                    done();
                })
            })
    })

     it('Class Method findOneAndRemove',(done)=>{
        User.findOneAndRemove({ name:'Nikki'})
            .then(()=>{
                User.findOne({name:'Nikki'})
                .then((users)=>{
                    assert(users===null);
                    done();
                })
            })

     });

     it('class Method findByIdAndRemove',(done)=>{
         User.findByIdAndRemove(joe._id)
            .then(()=>{
                User.findOne({name:'Nikki'})
                    .then((users)=>{
                        assert(users===null);
                        done();
                    })
            })
     })
});