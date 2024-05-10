const router = require("express").Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

const {
    handleGetAllUsers,
    deleteUser,
    bookTrip
} = require("../../controllers/userController");

router
    .route("/users")
    .get(handleGetAllUsers)
    .delete(deleteUser);

router.route("/users/bookTrip/:id").put(bookTrip);

module.exports = router;
