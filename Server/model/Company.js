const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  insurance: Boolean,
  drivers: [String],
  buses: [String],
  completed_trips: [String],
  upcomming_trips: [String],
  rating: Number,
});

module.exports = mongoose.model("Company", companySchema);
