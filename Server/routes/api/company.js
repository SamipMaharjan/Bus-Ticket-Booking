const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
  updateCompany,
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

router.route("/bus").post(addBus);
router.route("/bus/:id").get(handleGetOwnBus);

router
  .route("/upcommingTrips")
  .post(addUpcommingTrip);

router.route("/upcommingTrips/:id").get(handleGetOwnUpcommingTrip);

router.route("/user").get(getDetails);

router.put('/:id', updateCompany);

module.exports = router;
