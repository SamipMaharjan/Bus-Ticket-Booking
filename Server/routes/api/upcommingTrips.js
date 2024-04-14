const router = require("express").Router();
const {
  handleCreateUpcommingTrip,
  handleGetAllUpcommingTrips,
  deleteTrip,
} = require("../../controllers/upcommingTripsController");

router
  .route("/upcommingTrip")
  .post(handleCreateUpcommingTrip)
  .get(handleGetAllUpcommingTrips)
  .delete(deleteTrip);
  
module.exports = router;
