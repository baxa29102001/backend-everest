const moongose = require("mongoose");

const connectDB = async () => {
  try {
    const data = await moongose.connect(
      "mongodb+srv://kh_zuck:67002001bx@cluster0.tqsixrv.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Database connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
