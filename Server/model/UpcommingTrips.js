const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const upcommingTripsSchema = new Schema({
  companyId: {
    type: String,
    required: true,
  },
  driverId: {
    type: String,
    required: true,
  },
  pickUpPoint: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  banner: String,
  passengerIds: [String],
  Status: String,
  Price: Number,
  Image: String
});

// const upcommingTripsSchema = new Schema({
// companyId: {
//   type: String,
//   required: true,
// },
// driverId: {
//   type: String,
//   required: true,
// },
// pickUpPoint: {
//   type: String,
//   required: true,
// },
// destination: {
//   type: String,
//   required: true,
// },
// departureTime: {
//   type: String,
//   required: true,
// },
// passengerIds: [String],
// Status: String,
// });

module.exports = mongoose.model("UpcommingTrips", upcommingTripsSchema);
