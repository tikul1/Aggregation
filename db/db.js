const mongoose = require("mongoose");

const mongoDBConnection = () => {
  mongoose.set("strictQuery", false);
  /*------------- | MONGO DB CONNECTION STRING | ----------- */
  const url = `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.curpv.mongodb.net/main?retryWrites=true&w=majority`;
  /*------------- | MONGO DB CONNECTION | ----------- */
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, success) => {
    if (error) {
      console.log(`Error while database connection ${error}`);
    } else {
      console.log("Database connected.");
    }
  });
};
module.exports = mongoDBConnection;
