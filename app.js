require("dotenv").config();
const express=require("express")

require("./database/connect");
const studentModel=require("./database/model/student");
const attendanceModel=require("./database/model/attendance");
const attendance = require("./database/model/attendance");

const app=express();
const port=process.env.PORT || 8080;


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post("/student",async(req,res)=>{
    try{
        let student=new studentModel({
            name:req.body.name,
            roll_number:req.body.roll_number,
            department:req.body.department
        })
        await student.save();
        res.status(200);
        res.json({message:"student added",success:true})
    }
    catch(err){
        res.status(500);
        res.json({message:err.message,success:false});
    }
})

app.post("/attendance",async(req,res)=>{
    try{
        let date=new Date((new Date).getTime()+(5.5*60*60*1000));
        let hour=getInterval(date);
        let att=await attendanceModel.findOne({date:getDate(date),hour:hour});
        if(att){
            res.status(200);
            res.json({message:"alrady added attendance",success:false});
            return;
        }
        let data=await studentModel.findOne({roll_number:req.body.roll_number});
        if(!data){
            res.status(400);
            res.json({message:"Invalid roll number",success:false});
            return;
        }
        let attendance=new attendanceModel({
            student:data._id,
            hour:hour
        })
        await attendance.save();
        res.status(200);
        res.json({message:"attendance added",success:true});
    }
    catch(err){
        res.status(500);
        res.json({message:err.message,success:false});
    }
})

app.get("/attendance",async(req,res)=>{
    try{
        let student=await studentModel.findOne({roll_number:req.query.roll_number});
        if(!student){
            res.status(400);
            res.json({message:"Invalid roll number",success:false});
            return;
        }
        let date=await attendanceModel.aggregate([
            {$match:{student:student._id}},
            {$group:{
                _id:"$date",
                attendance:{$push:"$hour"}
            }}
        ])
        res.status(200);
        res.json({message:`attendance for ${req.query.roll_number}`,date,success:true});
    }
    catch(err){
        res.status(500);
        res.json({message:err.message,success:false});
    }
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})


function getInterval(date){
    if(date.getHours()>=9 && date.getHours()<10){
        return 1;
    }
    else if(date.getHours()>=10 && date.getHours()<11){
        return 2;
    }
    else if(date.getHours()>=11 && date.getHours()<12){
        return 3;
    }
    else if(date.getHours()>=13 && date.getHours()<14){
        return 4;
    }
    else if(date.getHours()>=14 && date.getHours()<15){
        return 5;
    }
    else if(date.getHours()>=15 && date.getHours()<16){
        return 6;
    }
    return -2;
}

function getDate(date){
    return new Date().toLocaleString("en-IN").split(",")[0]
}

// let time=new Date().toLocaleString("en-IN").split(",")[0]
// console.log(time);