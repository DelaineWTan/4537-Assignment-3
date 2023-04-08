const mongoose = require('mongoose')

const apiUserDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  endpoint: { type: String, required: true },
  status: { type: Number, required: true },
});

module.exports = mongoose.model('ApiUserData', apiUserDataSchema) 