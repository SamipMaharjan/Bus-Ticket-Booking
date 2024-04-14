const {
  handleNewUser,
  handleNewCompany,
} = require("../../controllers/registerController");
const registerRouter = require("express").Router();

registerRouter.route("/registerUser").post(handleNewUser);
registerRouter.route("/registerCompany").post(handleNewCompany);

module.exports = registerRouter;
