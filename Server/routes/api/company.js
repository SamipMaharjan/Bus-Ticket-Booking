const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
  getDetails,
  companyLogin,
  handleGetAllCompanies,
  deleteCompany,
  addBus,
  handleGetOwnBus,
  addUpcommingTrip,
  handleGetOwnUpcommingTrip,
} = require("../../controllers/companyController");

router
  .route("/")
  .post(companyLogin)
  .get(handleGetAllCompanies)
  .delete(deleteCompany);

router.route("/bus").get(handleGetOwnBus).post(addBus);

router
  .route("/upcommingTrips")
  .get(handleGetOwnUpcommingTrip)
  .post(addUpcommingTrip);

router.route("/user").get(getDetails);

module.exports = router;
