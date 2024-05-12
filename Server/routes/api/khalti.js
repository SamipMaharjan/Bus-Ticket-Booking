const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const { initiatePayment } = require("../../controllers/khalti.controller");
// router.post(
//   "/khalti/verify/:orderID",
//   verifyToken,
//   emailVerified,
//   verifyPayment
// );
router.post("/khalti/initiatePayment", verifyJWT, initiatePayment);

module.exports = router;
