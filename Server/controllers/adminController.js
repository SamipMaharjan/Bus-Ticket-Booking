// const Admin_email = process.env.ADMIN_EMAIL
// const Admin_pwd = process.env.ADMIN_PWD

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  console.log("hyit admin");
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email or password missing" });
  const Admin_email = process.env.ADMIN_EMAIL;
  const Admin_pwd = process.env.ADMIN_PWD;
  if (email === Admin_email && bcrypt.compare(password, Admin_pwd)) {
    const roles = 5150;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          roles: roles,
          email: email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    res.status(200).json({ token: accessToken });
  } else {
    // console.log("lastres");
    res.sendStatus(401);
  }
};

// const adminDeleteUser = async (req, res) => {
//   console.log(req.body.id);
//   try{
//     const UserId = req.body.id;
//     const result = await Users.findOneAndDelete({ _id: UserId });
//     if (result) {;
//       return res.status(200).json({
//         success: true,
//         message: "User succesfully deleted.",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Internal Server Error"})
//   }
// };



module.exports = { adminLogin, adminDeleteUser };
