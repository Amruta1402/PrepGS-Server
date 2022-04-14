const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Alums=require('../models/alums');
const authenticate=require('../authenticate');
const cors=require('./cors');

const alumRouter=express.Router();

alumRouter.use(bodyParser.json());

alumRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    Alums.find({})//change
    .then((alums)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(alums);
    },(err)=>{
        next(err);
    })
    .catch((err)=>{next(err);});
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Alums.create(req.body)
    .then((alum)=>{
        console.log('Alum created: ',alum);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(alum);
    },(err)=>{
        next(err);
    })
    .catch((err)=>{next(err);});
});

module.exports = alumRouter;