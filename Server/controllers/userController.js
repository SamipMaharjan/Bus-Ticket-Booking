const UpcommingTrips = require("../model/UpcommingTrips");
const Users = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleGetAllUsers = async (req, res) => {
  try {
    // console.log("\nhello");
    const allUsers = await Users.find({}).exec();
    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    return res.status(500).json(allUsers);
  }
};

const deleteUser = async (req, res) => {
  console.log(req.body.id);
  try {
    const UserId = req.body.id;
    const result = await Users.findOneAndDelete({ _id: UserId });
    if (result) {
      return res.status(200).json({
        success: true,
        message: "User succesfully deleted.",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const bookTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const result = await UpcommingTrips.findOne({ _id: tripId }).exec();
    // if (result) {
    //   console.log("result", result);
    //   return res.json({ message: "done" });
    // }
    // console.log("result nll", result);
    // return res.json({ message: "nnothing" });
    if (result) {
      const user = await Users.findOne({ email: req.email }).exec();
      console.log("user", user);
      // Update a single document
      // User.updateOne(
      //   // { name: user },
      //   // { $set: { name: "NewCompany" } },
      //   (err, result) => {
      //     if (err) {
      //       console.error(err);
      //     } else {
      //       console.log("Updated document:", result);
      //     }
      //   }
      // );
      user.booked_trips.push(result);
      user.save();
      return res
        .status(200)
        .json({ message: "successfully updated booked Trips" });
    }
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // if (!authHeader.startsWith("Bearer ")) {
    //   return res
    //     .status(401)
    //     .json({ message: "Bearer missing in authorization header." });
    // }

    // const token = authHeader.split(" ")[1];

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    //   if (err) {
    //     console.error("\n Error:", err);
    //     return res.sendStatus(403);
    //   }

    //   const foundUser = await Users.findOne({ email: decoded.UserInfo.email }).exec();
    //   // console.log(foundUser);
    //   if (!foundUser) {
    //     console.log("401:", email, "User does not exist");
    //     return res
    //       .status(401)
    //       .json({ error: "Unauthorized: User does not exist." });
    //   }

    //   res.status(200).json({"success": foundUser}); // Attach result to req object
    // });
    // }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { handleGetAllUsers, deleteUser, bookTrip };
