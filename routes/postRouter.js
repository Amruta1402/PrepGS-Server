const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const Posts=require('../models/posts');
const authenticate=require('../authenticate');
const cors=require('./cors');

const postRouter=express.Router();

postRouter.use(bodyParser.json());

postRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAlumni,(req,res,next)=>{
    Posts.find({})
    .then((posts)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posts);
    },(err)=>{
        next(err);
    })
    .catch((err)=>{next(err);});
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAlumni,(req,res,next)=>{
    Posts.create(req.body)
    .then((post)=>{
        console.log('Post created: ',post);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    },(err)=>{
        next(err);
    })
    .catch((err)=>{next(err);});
});

module.exports = postRouter;