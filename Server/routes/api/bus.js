const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
  handleCreateBus,
  handleGetAllBuses,
  deleteBus,
  updateBus
} = require("../../controllers/busController");

router
  .route("/bus")
  .post(handleCreateBus)
  .get(handleGetAllBuses)
  // .get(handleCompanyBus)
  .delete(deleteBus);
router.put('/bus/:id', updateBus);

module.exports = router;
