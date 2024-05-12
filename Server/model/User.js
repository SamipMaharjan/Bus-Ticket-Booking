const mongoose = require("mongoose");
const { any } = require("zod");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    Passenger: { type: Number, default: 2001 },
    Driver: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  booked_trips: [
    {
      companyId: {
        type: String,
        required: true,
      },
      driverId: {
        type: String,
        required: false,
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
      price: {
        type: Number,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
    },
  ],
  refreshToken: String,
  companyId: String,
});

module.exports = mongoose.model("User", userSchema);
