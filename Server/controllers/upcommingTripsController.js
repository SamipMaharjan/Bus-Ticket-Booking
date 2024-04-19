const UpcommingTrips = require("../model/UpcommingTrips");
const upcommingTripsValidation = require("../zod/upcommingTrips.validation");
const { StatusCodes } = require("http-status-codes");
const Company = require("../model/Company");
const User = require("../model/User");
const mongoose = require("mongoose");
const { verifyJWT } = require("../middleware/verifyJWT");

const handleCreateUpcommingTrip = async (req, res) => {
  try {
    const { companyId, driverId, pickUpPoint, destination, departureTime, price, image } = req.body;
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

    const validation = upcommingTripsValidation.safeParse(req.body);

    if (!validation.success) {
      console.log("\n\n err \n\n");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: validation.error.errors });
    }
    const result = await UpcommingTrips.create({
      companyId,
      driverId,
      pickUpPoint,
      destination,
      departureTime,
      price,
      image
    });
    console.log("Result after creating", result);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Upcomming Trip successfully created.",
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

const handleGetAllUpcommingTrips = async (req, res) => {
  try {
    const allUpcommingTrips = await UpcommingTrips.find({}).exec();
    if (allUpcommingTrips) {
      return res.status(200).json(allUpcommingTrips);
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
  // console.log(req.body.id);
  // verifyJWT()
  try{
    const tripId = req.body.id;
    const result = await UpcommingTrips.findOneAndDelete({ _id: tripId });
    if (result) {;
      return res.status(200).json({
        success: true,
        message: "Upcomming Trip succesfully deleted.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error"})
  }
};

module.exports = { handleCreateUpcommingTrip, handleGetAllUpcommingTrips, deleteTrip };
