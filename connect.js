const mongoose = require("mongoose");

// async function connectToMongoDB() {
//   try {
//     await mongoose.connect("mongodb://localhost/27017/short-url");
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log("Error connecting to MongoDB", err);
//   }
// }

function connectToMongoDB() {
  mongoose
    .connect("mongodb://localhost:27017/short-url")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
}


module.exports = connectToMongoDB;
