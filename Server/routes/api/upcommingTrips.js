const router = require("express").Router();
const {
  handleCreateUpcommingTrip,
  handleGetAllUpcommingTrips,
  deleteTrip,
  updateTrip
} = require("../../controllers/upcommingTripsController");
const { verifyJWT } = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

router
  .route("/upcommingTrip")
  .post(handleCreateUpcommingTrip)
  .get(handleGetAllUpcommingTrips)
  .delete(deleteTrip);

// router
//   .route("/upcommingTrip")
//   .post(handleCreateUpcommingTrip)
//   .get(handleGetAllUpcommingTrips)
//   .delete(deleteTrip);
router.put('/upcommingTrip/:id', updateTrip);

module.exports = router;
