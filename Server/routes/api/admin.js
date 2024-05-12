const adminRouter = require("express").Router();

const { adminLogin, getAllData } = require("../../controllers/adminController");

adminRouter.route("/adminLogin").post(adminLogin);
adminRouter.route("/admin").get(getAllData);

module.exports = adminRouter;
