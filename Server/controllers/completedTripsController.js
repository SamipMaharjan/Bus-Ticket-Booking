const CompletedTrips = require("../model/CompletedTrips");
const completedTripsValidation = require("../zod/completedTrips.validation");
const { StatusCodes } = require("http-status-codes");
const Company = require("../model/Company");
const User = require("../model/User");
const mongoose = require("mongoose");

const handleCreateCompletedTrip = async (req, res) => {
  try {
    const { companyId, driverId, pickUpPoint, destination, departureTime } = req.body;
    const companyExists = await Company.findById(companyId).exec();
    // console.log("company exists",companyExists);
    if (!companyExists) {
      console.log("Company doesnot exist");
      return res.status(404).json({
        success: false,
        message: "Company with the specified ID does not exist",
      });
    }
    console.log("2 ",driverId);
    // Check if DriverId exists in the database
    const driverExists = await User.find({
      _id: driverId,
      roles: { Driver: 1984 },
    }).exec();
    if (!driverExists) {
      return res.status(404).json({
        success: false,
        message: "Driver with the specified ID does not exist",
      });
    }

    const validation = completedTripsValidation.safeParse(req.body);

    if (!validation.success) {
      console.log("\n\n err \n\n");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: validation.error.errors });
    }
    const result = await CompletedTrips.create({
      companyId,
      driverId,
      pickUpPoint,
      destination,
      departureTime,
    });
    console.log("Result after creating", result);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Completed Trip successfully created.",
      });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal Server Error" });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ message: "Internal server err" });
  }
};

const handleGetAllCompletedTrips = async (req, res) => {
  try {
    const allCompletedTrips = await CompletedTrips.find({}).exec();
    if (allCompletedTrips) {
      return res.status(200).json(allCompletedTrips);
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteTrip = async (req, res) => {
//   console.log(req.body.id);
  try{
    const tripId = req.body.id;
    const result = await CompletedTrips.findOneAndDelete({ _id: tripId });
    if (result) {;
      return res.status(200).json({
        success: true,
        message: "Completed Trip succesfully deleted.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error"})
  }
};
module.exports = { handleCreateCompletedTrip, handleGetAllCompletedTrips, deleteTrip };
