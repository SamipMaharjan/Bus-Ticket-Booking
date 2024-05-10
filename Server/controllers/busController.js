const Bus = require("../model/Bus");
const busValidation = require("../zod/bus.validation");
const { StatusCodes } = require("http-status-codes");
const UpcommingTrip = require("../model/UpcommingTrips");
const Company = require("../model/Company");
const User = require("../model/User");
const mongoose = require("mongoose");

const handleCreateBus = async (req, res) => {
  try {
    const { upcommingTripId, driverId, companyId, name, number } = req.body;

    console.log("2 ", upcommingTripId);
    const tripExists = await UpcommingTrip.findById(upcommingTripId).exec();
    console.log("trip exists", tripExists);
    if (!tripExists) {
      console.log("Upcomming trip doesnot exist");
      return res.status(404).json({
        success: false,
        message: "Trip with the specified ID does not exist",
      });
    }

    const companyExists = await Company.findById(companyId).exec();
    // console.log("company exists",companyExists);
    if (!companyExists) {
      console.log("Company doesnot exist");
      return res.status(404).json({
        success: false,
        message: "Company with the specified ID does not exist",
      });
    }
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

    const validation = busValidation.safeParse(req.body);

    if (!validation.success) {
      console.log("\n\n err \n\n");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: validation.error.errors });
    }
    const result = await Bus.create({
      upcommingTripId,
      driverId,
      companyId,
      name,
      number,
    });
    console.log("Result after creating", result);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Bus successfully created.",
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

const handleGetAllBuses = async (req, res) => {
  try {
    const allBuses = await Bus.find({}).exec();
    if (allBuses) {
      return res.status(200).json(allBuses);
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

const deleteBus = async (req, res) => {
  console.log(req.body.id);
  try {
    const busId = req.body.id;
    const result = await Bus.findOneAndDelete({ _id: busId });
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Bus succesfully deleted.",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateBus = async (req, res) => {
  try {
    const busId = req.params.id; // Get company ID from request parameters
    const updateData = req.body; // Get update data from request body

    const updateObject = { $set: updateData };

    // Find the company by ID and update
    const updatedBus = await Bus.findByIdAndUpdate(busId, updateObject, { new: true });

    if (!updatedBus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    return res.status(200).json({ success: true, message: 'Bus updated successfully', bus: updatedBus });
  } catch (error) {
    console.error('Error updating Bus:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
module.exports = { handleCreateBus, handleGetAllBuses, deleteBus, updateBus };
