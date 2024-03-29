const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async (input) => {
  try {
    const x = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
    if (input.drop === true) {
      mongoose.connection.db.dropDatabase();
      console.log("Dropped db");
    }
  } catch (error) {
    console.log("db error");
  }
};

module.exports = { connectDB };
