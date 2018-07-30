const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');
const Schema = mongoose.Schema;

describe('Association',()=>{
    let joe, blogPost, comment;
    beforeEach((done)=>{
        joe = new User({ name :'Nikunj'});
        blogPost = new BlogPost({
            title:'Js is Great',
            content:' Yep it really is !!'
        });
        comment = new Comment({
            content: 'Congrats for great post'
        })
//Association between different Model.
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
//For Chainning the more promise and perform some function after that.
        Promise.all([joe.save(), blogPost.save(), comment.save()])
                    .then(()=>done());
    });
//it.only will run that particular test cases.
    it('Saves a Relation between a user and a blogPost',(done)=>{
        User.findOne({name:'Nikunj'})
            .then((users)=>{
                console.log('data is ',users );
                done();
            });

    });

    it('Saves a Relation between a user and a blogPost Using Populate Modifier',(done)=>{
        User.findOne({name:'Nikunj'})
            .populate('blogPosts')
            .then((users)=>{
                assert(users.blogPosts[0].title==='Js is Great');
                done();
            });

    });

    it('Saves a full relation graph',(done)=>{
        User.findOne({name:'Nikunj'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate:{
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((users)=>{
                assert(users.name==='Nikunj');
                assert(users.blogPosts[0].title === 'Js is Great');
                assert(users.blogPosts[0].comments[0].content==='Congrats for great post');
                assert(users.blogPosts[0].comments[0].user.name ==='Nikunj');
                done();
            });
    });
})