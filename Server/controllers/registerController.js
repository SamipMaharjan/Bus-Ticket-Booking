const User = require("../model/User");
const Company = require("../model/Company");

const bcrypt = require("bcrypt");
const allRoles = require("../config/roles_list");

const handleNewUser = async (req, res) => {
  const { username, password, roles, email, companyId } = req.body;

  if (!username || !password || !roles || !email)
    return res
      .status(400)
      .json({ message: "Username | password | email | roles are required" });

  //check for duplicate emails in database;
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.status(409).json({ error: "User Already Exists!" }); //Conflict
  try {
    const roleValues = Object.values(roles);
    //encrypted passwrod
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    if (roleValues.includes(allRoles.Passenger)) {
      console.log("pas --------------------");
      const result = await User.create({
        username,
        email,
        password: hashedPwd,
        roles,
      });
      console.log("result", result);
      res.status(201).json({ success: true, message: `New user ${username} created ` });
    } else if (roleValues.includes(allRoles.Driver)) {
      console.log("comid --------------------", companyId);
      handleNewDriver(req, res);
    } else {
      return res
        .status(400)
        .json({ error: "Company ID missing for driver from here." });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const handleNewDriver = async (req, res) => {
  const { username, password, roles, email, companyId } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  if (!username || !password || !roles || !email)
    return res
      .status(400)
      .json({ message: "Username | password | email | roles are required" });

  //check for duplicate emails in database;
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ error: "User email Already Exists!" }); //Conflict
  // console.log("comid --------------------", companyId);

  if (companyId) {
    const companyExists = await Company.findById(companyId).exec();
    console.log("does compnay exist?? ====\n", companyExists, "nnsadfdsf");
    if (companyExists) {
      const result = await User.create({
        username,
        email,
        password: hashedPwd,
        companyId,
        roles,
      });
      if (result) {
        companyExists.drivers = [...companyExists.drivers, result._id];
        const companyData = await companyExists.save();
        return res
          .status(201)
          .json({ success: `New Driver ${username} created ` });
      }
    } else {
      return res.status(400).json({
        error: "Cannot create driver because company does not exist.",
      });
    }
    console.log("result", result);
  } else {
    return res.status(400).json({
      error: "CompanyID is required.",
    });
  }
};

const handleNewCompany = async (req, res) => {
  const { name, password, roles, email, location, contact, insurance } =
    req.body;
  // console.log("reqbody", req.body);
  if (
    !name ||
    !password ||
    !roles ||
    !email ||
    !location ||
    !contact ||
    insurance == undefined
  )
    return res.status(400).json({ message: "Not all required fields are met" });

  console.log("req.body", req.body);
  //check for duplicate usernames in database;
  const duplicate = await Company.findOne({ name }).exec();
  if (duplicate)
    return res.status(409).json({ error: "Company name Already Exists!" }); //Conflict
  try {
    //encrypted passwrod
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await Company.create({
      name,
      email,
      passwordHash: hashedPwd,
      roles,
      contact,
      insurance,
      location,
    });
    console.log("result", result);

    res
      .status(201)
      .json({ success: true, message: `New Company ${name} created ` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser, handleNewCompany };
