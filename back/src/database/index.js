const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/loremInvest", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log("Was a problem with the database connection!", err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;