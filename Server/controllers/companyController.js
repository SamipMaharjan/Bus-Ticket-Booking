const Company = require("../model/Company");
const Bus = require("../model/Bus");
const UpcommingTrips = require("../model/UpcommingTrips");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const companyLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("req", req);
  console.log("password", password);

  if (!email || !password)
    return res.status(400).json({ message: "Email or password missing" });
  // console.log(User, email, password, "========");
  const foundUser = await Company.findOne({ email: email }).exec();
  // console.log(foundUser);
  if (!foundUser) {
    // console.log("401:", email, "User does not exist");
    return res
      .status(401)
      .json({ error: "Unauthorized: Company does not exist." });
  }
  //evaluate password
  // console.log("pass", password, "fUpass:", foundUser.password);
  const match = await bcrypt.compare(password, foundUser.passwordHash);
  if (match) {
    // const roles = Object.values(foundUser.roles);

    const Roles = { Admin: 5150 };
    // create and send JWT
    // console.log("asdf", process.env.ACCESS_TOKEN_SECRET, foundUser.username);
    // console.log(" secret", process.env.ACCESS_TOKEN_SECRET)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.name,
          roles: Roles,
          email: email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    // const refreshToken = jwt.sign(
    //   { username: foundUser.username },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "10m" }
    // );
    // foundUser.refreshToken = refreshToken;
    // const result = await foundUser.save();
    // console.log("erase refToken result:", result);

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   sameSite: "None",
    //   secure: true,
    // });
    res.status(200).json({ success: true, token: accessToken });
  } else {
    // console.log("lastres");
    res.sendStatus({ success: false, message: 401 });
  }
};

const handleGetAllCompanies = async (req, res) => {
  try {
    const result = await Company.find({}).exec();
    console.log("result comapny", result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteCompany = async (req, res) => {
  // console.log(req.body.id);
  try {
    const companyId = req.body.id;
    const result = await Company.findOneAndDelete({ _id: companyId });
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Company succesfully deleted.",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const addBus = async (req, res) => {
  try {
    const companyId = req.body.id;
    const busId = req.body.bus;
    const result = await Company.findByIdAndUpdate(
      { _id: companyId },
      { $push: { buses: busId } }, // Append newValue to the arrayField
      { new: true } // Options: return the modified document
    );
    // find({_id: busId}).exec();
    // console.log("company bus", result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const handleGetOwnBus = async (req, res) => {
  try {
    const companyId = req.params.id;
    const result = await Company.findById({ _id: companyId });
    // .distinct("buses",{ _id: companyId });
    if (result) {
      // If company is found, log company data and send buses as response
      console.log("Company data:", result);
      console.log("Buses:", result.buses);

      // Send company.buses as response
      res.status(200).json(result.buses);
    } else {
      // If company is not found, send an error response
      console.log("Company not found");
      res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const addUpcommingTrip = async (req, res) => {
  try {
    const companyId = req.body.id;
    const upcommingTripId = req.body.upcomming_trip;
    console.log(upcommingTripId);
    const result = await Company.findByIdAndUpdate(
      { _id: companyId },
      { $push: { upcomming_trips: upcommingTripId } }, // Append newValue to the arrayField
      { new: true } // Options: return the modified document
    );
    // find({_id: busId}).exec();
    // console.log("company upcomming trips", result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const handleGetOwnUpcommingTrip = async (req, res) => {
  try {
    const companyId = req.body.id;
    const result = await UpcommingTrips.find({ companyId: companyId }).exec();
    // .distinct("buses",{ _id: companyId });
    console.log(result);
    if (result) {
      // If company is found, log company data and send buses as response
      console.log("Company data:", result);
      // console.log('Buses:', result.upcomming_trips);

      // Send company.buses as response
      res.status(200).json(result);
    } else {
      // If company is not found, send an error response
      console.log("Upcomming Trips not found");
      res.status(404).json({ message: "Upcomming Trips not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getDetails = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Bearer missing in authorization header." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.error("\n Error:", err);
      return res.sendStatus(403);
    }

    const foundUser = await Company.findOne({
      email: decoded.UserInfo.email,
    }).exec();
    // console.log(foundUser);
    if (!foundUser) {
      console.log("401:", email, "User does not exist");
      return res
        .status(401)
        .json({ error: "Unauthorized: User does not exist." });
    }

    res.status(200).json({ success: foundUser }); // Attach result to req object
  });
};

const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id; // Get company ID from request parameters
    const updateData = req.body; // Get update data from request body

    const updateObject = { $set: updateData };

    // Find the company by ID and update
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateObject,
      { new: true }
    );

    if (!updatedCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  updateCompany,
  getDetails,
  companyLogin,
  handleGetAllCompanies,
  deleteCompany,
  addBus,
  handleGetOwnBus,
  addUpcommingTrip,
  handleGetOwnUpcommingTrip,
};
