const router = require("express").Router();
const {
  handleCreateCompletedTrip,
  handleGetAllCompletedTrips,
  deleteTrip,
} = require("../../controllers/completedTripsController");

router
  .route("/completedTrip")
  .post(handleCreateCompletedTrip)
  .get(handleGetAllCompletedTrips)
  .delete(deleteTrip);
  
module.exports = router;
