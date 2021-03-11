const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var emailValidator = require("email-validator");
const bcrypt = require('bcrypt');

const subTaskSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true, 
        unique: false,
    },
    desc:{
        type: String,
        required: true,
    },
    status:{
        type:String,
        default: "to-do",
    }
},{_id: false, skipVersioning: { dontVersionMe: true } });

const activitySchema = new mongoose.Schema({
    id: {
        type:Number,
        required:true,
        unique: false,
    },
    date: {
        type: Date,
        default: new Date()
    },
    title:{
        type:String,
        required: true,
    },
    progres:{
        type: Number,
        default: 0,
    },
    isActive:{
        type: Boolean,
        required: true,
    },
    subTasks:[subTaskSchema],
},{_id: false, skipVersioning: { dontVersionMe: true } });

const DayActivitySchema= new mongoose.Schema({
    id: {
        type:Number,
        required:"true",
        unique:"false",
    },
    timeStamps:{
        type: Array,
    }
},{_id: false, skipVersioning: { dontVersionMe: true } })

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 18,
    },
    lastModified:{
        type: Date,
        default: new Date(),
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val){
            return emailValidator.validate(val);
        }
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    activeTasks:[
[DayActivitySchema],[DayActivitySchema],[DayActivitySchema],[DayActivitySchema],[DayActivitySchema],[DayActivitySchema],[DayActivitySchema],
    ],
    activities:[activitySchema]
});

userSchema.pre('save', function(next){
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash)=>{
        if (err) return next(err);
        user.password = hash;
        next()
    });
});


userSchema.plugin(uniqueValidator, { message: 'Podany {PATH} jest zajęty.' });


module.exports = mongoose.model('user', userSchema );