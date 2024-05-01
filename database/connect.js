const mongoose=require("mongoose")
const url=process.env.MONGO_URL

mongoose.connect(url)
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log("Database connection error");
})