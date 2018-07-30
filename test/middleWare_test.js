const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('MiddleWare Test',()=>{

    let joe, blogPost;
    beforeEach((done)=>{
        const BlogPost = mongoose.model('blogPost');
        joe = new User({ name :'Nikunj'});
        blogPost = new BlogPost({
            title:'Js is Great',
            content:' Yep it really is !!'
        }); 
//Association between different Model.
        joe.blogPosts.push(blogPost);
//For Chainning the more promise and perform some function after that.
        Promise.all([joe.save(), blogPost.save()])
                    .then(()=>done());
    });
 it('User Clean up dangling blogPost on remove',(done)=>{
    const BlogPost = mongoose.model('blogPost');
        joe.remove()
        .then(()=>BlogPost.count())
        .then((count)=>{
            console.log('Count is ====>', count);
            assert(count ===0);
            done();
        });
    });
   
});