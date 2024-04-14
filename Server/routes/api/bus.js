const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
  handleCreateBus,
  handleGetAllBuses,
  deleteBus
} = require("../../controllers/busController");

router
  .route("/bus")
  .post(handleCreateBus)
  .get(handleGetAllBuses)
  // .get(handleCompanyBus)
  .delete(deleteBus);
module.exports = router;
