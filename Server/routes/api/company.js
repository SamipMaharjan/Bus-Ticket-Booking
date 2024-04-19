const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
  handleGetAllCompanies,
  deleteCompany,
  addBus,
  handleGetOwnBus,
  addUpcommingTrip, 
  handleGetOwnUpcommingTrip
} = require("../../controllers/companyController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
router
  .route("/")
  .get(handleGetAllCompanies)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Company),deleteCompany); 

router
  .route("/bus")
  .get(handleGetOwnBus)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Company),addBus);
router
  .route("/upcommingTrips")
  .get(handleGetOwnUpcommingTrip)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Company),addUpcommingTrip);

module.exports = router;
