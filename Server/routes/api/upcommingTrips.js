const router = require("express").Router();
const {
  handleCreateUpcommingTrip,
  handleGetAllUpcommingTrips,
  deleteTrip,
  addImage
} = require("../../controllers/upcommingTripsController");

router
  .route("/upcommingTrip")
  .post(handleCreateUpcommingTrip)
  .get(handleGetAllUpcommingTrips)
  .delete( deleteTrip)

router
  .route("/upcommingTrip/addImage")
  .post(addImage)
  
module.exports = router;
