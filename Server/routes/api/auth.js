const authRouter = require("express").Router();

const { handleLogin } = require("../../controllers/authController");

authRouter.route("/login").post(handleLogin);

module.exports = authRouter;
