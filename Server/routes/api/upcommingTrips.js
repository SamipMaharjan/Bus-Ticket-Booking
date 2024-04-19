const router = require("express").Router();
const {
  handleCreateUpcommingTrip,
  handleGetAllUpcommingTrips,
  deleteTrip
} = require("../../controllers/upcommingTripsController");
const { verifyJWT } = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

router
  .route("/upcommingTrip")
  .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Company),handleCreateUpcommingTrip)
  .get(handleGetAllUpcommingTrips)
  .delete(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Company),deleteTrip)
  
module.exports = router;
