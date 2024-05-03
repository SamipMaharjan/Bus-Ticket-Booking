// const router = require("express").Router();
// const {
//   handleCreateUpcommingTrip,
//   handleGetAllUpcommingTrips,
//   deleteTrip
// } = require("../../controllers/upcommingTripsController");
// const { verifyJWT } = require("../../middleware/verifyJWT");
// const verifyRoles = require("../../middleware/verifyRoles");
// const ROLES_LIST = require("../../config/roles_list");

// router
//   .route("/upcommingTrip")
//   .post(handleCreateUpcommingTrip)
//   .get(handleGetAllUpcommingTrips)
//   .delete(deleteTrip);
  
// module.exports = router;
const router = require("express").Router();
const {
  handleCreateUpcommingTrip,             // Handling creation of upcoming trips
  handleGetAllUpcommingTrips,            // Handling retrieval of all upcoming trips
  deleteTrip                            // Handling deletion of a trip
} = require("../../controllers/upcommingTripsController");
const { verifyJWT } = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

router
  .route("/upcommingTrip")
  .post(handleCreateUpcommingTrip)      // Route for creating upcoming trip
  .get(handleGetAllUpcommingTrips)     // Route for getting all upcoming trips
  .delete(deleteTrip);                 // Route for deleting a trip
  
module.exports = router;
