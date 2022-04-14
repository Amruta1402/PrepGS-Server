const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps:true
});

const Posts=mongoose.model('Post',postSchema);

module.exports = Posts;