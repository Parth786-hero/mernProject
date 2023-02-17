const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_HOST}`)
    .then(()=>{
        console.log("database connection is successfull ....");
    })
    .catch((e)=>{
        console.log(e);
    })