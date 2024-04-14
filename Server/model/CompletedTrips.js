const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedTripsSchema = new Schema({
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
  tripRating: Number
});

module.exports = mongoose.model("CompletedTrips", completedTripsSchema);
