const router = require("express").Router();
const { handleGetAllUsers, deleteUser } = require("../../controllers/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
router
    .route("/users")
    .get(handleGetAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Passenger),deleteUser);

module.exports = router;
