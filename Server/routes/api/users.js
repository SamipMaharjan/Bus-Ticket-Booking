const router = require("express").Router();
const { handleGetAllUsers, deleteUser } = require("../../controllers/userController");

router
    .route("/users")
    .get(handleGetAllUsers)
    .delete(deleteUser);

module.exports = router;
