const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new Schema({
    
    enrollment:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default:"assets/user.png"
    },
    specialization:{
        type: String
    },
    alumni:{
        type:Boolean,
        default: false
    },
    featured:{
        type:Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);
const Users=mongoose.model('User',userSchema);

module.exports=Users;