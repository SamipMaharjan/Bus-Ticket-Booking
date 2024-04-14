const adminRouter = require("express").Router();

const { adminLogin } = require("../../controllers/adminController");

adminRouter.route("/adminLogin").post(adminLogin);

module.exports = adminRouter;
