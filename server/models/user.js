const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    desc:{
        type: String,
        required: true,
    },
    status:{
        type:String,
        default: "to-do",
    }
},{_id: false});

const activitySchema = new mongoose.Schema({
    id: {
        type:Number,
        required:"true",
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
},{_id: false});

const DayActivitySchema= new mongoose.Schema({
    id: {
        type:String,
        required:"true",
    },
    Timestamps:{
        type: Array,
    }
})

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    lastModyfied:{
        type: Date,
        default: new Date(),
    },
    email: {
        type: String,
        required: true,
        unique: true,
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


module.exports = mongoose.model('user', userSchema );