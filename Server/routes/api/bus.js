const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
  handleCreateBus,
  handleGetAllBuses,
  deleteBus
} = require("../../controllers/busController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
router
  .route("/bus")
  .post(verifyRoles(ROLES_LIST.Company,ROLES_LIST.Admin),handleCreateBus)
  .get(handleGetAllBuses)
  // .get(handleCompanyBus)
  .delete(deleteBus);
module.exports = router;
