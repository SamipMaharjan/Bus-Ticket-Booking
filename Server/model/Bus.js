const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema({
    upcommingTripId: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true,
    },
    driverId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Bus", busSchema);
