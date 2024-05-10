const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

const {
  handleGetAllUsers,
  deleteUser,
  bookTrip,
  updateUser
} = require("../../controllers/userController");

router.route("/users").get(handleGetAllUsers).delete(deleteUser);

router
  .route("/users/bookTrip/:id")
  .put(verifyJWT, verifyRoles(ROLES_LIST.Passenger), bookTrip);

router.put('/users/:id', updateUser);

module.exports = router;
