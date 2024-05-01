const mongoose=require("mongoose")

const attendanceSchema=mongoose.Schema({
    student:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"student"
    },
    date:{
        type:String,
        required:true,
        default:new Date().toLocaleString("en-IN").split(",")[0],
    },
    hour:{
        type:Number,
        required:true,
    }
})

const attendance=mongoose.model("attendance",attendanceSchema,"attendance");

module.exports=attendance;