const Company = require("../model/Company");
const Bus = require("../model/Bus");

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
    const companyId = req.params.id;
    const result = await Company
    .findById({ _id: companyId });
    // .distinct("buses",{ _id: companyId });
    if (result) {
      // If company is found, log company data and send buses as response
      console.log('Company data:', result);
      console.log('Buses:', result.upcomming_trips);

      // Send company.buses as response
      res.status(200).json(result.upcomming_trips);
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

module.exports = { handleGetAllCompanies, deleteCompany, addBus, handleGetOwnBus, addUpcommingTrip, handleGetOwnUpcommingTrip };
