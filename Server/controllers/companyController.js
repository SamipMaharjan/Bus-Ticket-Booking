const Company = require("../model/Company");
const Bus = require("../model/Bus");
const UpcommingTrips = require("../model/UpcommingTrips");

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
  try{
    const companyId = req.body.id;
    const result = await Company.findOneAndDelete({ _id: companyId });
    if (result) {;
      return res.status(200).json({
        success: true,
        message: "Company succesfully deleted.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error"})
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
    const result = await Company
    .findById({ _id: companyId });
    // .distinct("buses",{ _id: companyId });
    if (result) {
      // If company is found, log company data and send buses as response
      console.log('Company data:', result);
      console.log('Buses:', result.buses);
      
      // Send company.buses as response
      res.status(200).json(result.buses);
    } else {
      // If company is not found, send an error response
      console.log('Company not found');
      res.status(404).json({ message: 'Company not found' });
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
      console.log('Company data:', result);
      // console.log('Buses:', result.upcomming_trips);

      // Send company.buses as response
      res.status(200).json(result);
    } else {
      // If company is not found, send an error response
      console.log('Upcomming Trips not found');
      res.status(404).json({ message: 'Upcomming Trips not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const companyLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
  return res.status(400).json({ message: "Email or password missing" });
  // console.log(User, email, password, "========");
  const foundUser = await Company.findOne({ email: email }).exec();
  // console.log(foundUser);
  if (!foundUser) {
    console.log("401:", email, "User does not exist");
    return res
      .status(401)
      .json({ error: "Unauthorized: User does not exist." });
  }
  //evaluate password
  // console.log("pass", password, "fUpass:", foundUser.password);
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create and send JWT
    // console.log("asdf", process.env.ACCESS_TOKEN_SECRET, foundUser.username);
    // console.log(" secret", process.env.ACCESS_TOKEN_SECRET)
    const accessToken = jwt.sign(
      {
        'UserInfo': 
          { 
            'username': foundUser.username, 
            'roles': roles, 
            'email': email
          }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    res.status(200).json({success: true, token: accessToken });
  } else {
    // console.log("lastres");
    res.sendStatus({ success: false, message: 401} );
  }
};

module.exports = { handleGetAllCompanies, deleteCompany, addBus, handleGetOwnBus, addUpcommingTrip, handleGetOwnUpcommingTrip, companyLogin };
