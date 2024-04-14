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

router
  .route("/")
  .get(handleGetAllCompanies)
  .delete(deleteCompany)
  .post(addBus)
  .post(addUpcommingTrip);

router.route("/:id").get(handleGetOwnBus).get(handleGetOwnUpcommingTrip);

module.exports = router;
