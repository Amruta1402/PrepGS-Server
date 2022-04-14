const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const alumSchema=new Schema({
    username:{
        type: String,
        required: true
    },
    enrollment:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    specialization:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ''
    },
    featured:{
        type:Boolean,
        default: false
    }
},{
    timestamps:true
});

const Alums=mongoose.model('Alum',alumSchema);

module.exports=Alums;