let bcrypt = require('bcryptjs');
const User = require('../../models/User');
let jwt = require('jsonwebtoken')

//register

//register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
  
    try {
        //user email exists ?
      const checkUser = await User.findOne({ email });
      if (checkUser)
        return res.json({
          success: false,
          message: "User Already exists with the same email! Please try again",
        });
  
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password: hashPassword,
      });
  
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "Registration successful",
        data: newUser
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };

// login

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        //check user exists ?
      const checkUser = await User.findOne({ email });
      if (!checkUser)
        return res.json({
          success: false,
          message: "User doesn't exists! Please register first",
        });
  
        // check hash passsword
      const checkPasswordMatch = await bcrypt.compare(
        password,
        checkUser.password
      );
      if (!checkPasswordMatch)
        return res.json({
          success: false,
          message: "Incorrect password! Please try again",
        });
  
        // create token
      const token = jwt.sign(
        {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          userName: checkUser.userName,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "60m" }
      );
  // send token client
      res.cookie("token", token, { httpOnly: true, secure: false }).json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };

// logout

let logout = async(req, res)=>{
    res.clearCookie('token').json({
        success: true,
        message: "Logged out successfully"
    })
}

// checkAuth
let authMiddleWare = async(req, res, next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: false, message: "Invalid Token"})
        try {
            let decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
            req.user = decoded;
            next()
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
}

module.exports = {registerUser, loginUser, logout, authMiddleWare}