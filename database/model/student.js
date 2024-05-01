const mongoose=require("mongoose")

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    roll_number:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    department:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    }
})

const student=mongoose.model("student",studentSchema,"student");

module.exports=student