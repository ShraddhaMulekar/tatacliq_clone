import express from "express";
import UserModel from "../models/user.model.js";
import LogOutModel from "../models/logOut.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let userRouter = express.Router();
let regexPass =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|]).{8,}$/;

// user registration
userRouter.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!regexPass.test(password)) {
    return res.json({
      msg: "Password must be at least 8 characters and include a letter, number, and special character.",
    });
  }
  try {
    const matchEmail = await UserModel.findOne({ email });
    if (matchEmail) {
      return res.json({
        msg: "User already registered! Please log in now!",
        matchEmail,
      });
    } else {
      bcrypt.hash(
        password,
        Number(process.env.SALTROUNDS),
        async (err, hash) => {
          if (err) {
            console.log("Password invalid!", err);
            return res.json({ msg: "Password invalid!", err });
          } else {
            let newUser = await UserModel({ email, role, password: hash });
            await newUser.save();
            console.log("Registration successful!", "newUser:", newUser);
            return res.json({
              msg: "Registration successful!",
              "newUser:": newUser,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log("error in register post router!", error);
    return res.json({ msg: "error in register post router!", error });
  }
});

// user login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ msg: "Email and Password are required!" });
  }

  try {
    const matchEmail = await UserModel.findOne({ email });
    if (!matchEmail) {
      return res.json({ msg: "Log in failed! Please registered now!" });
    } else {
      bcrypt.compare(password, matchEmail.password, async (err, result) => {
        if (err) {
          console.log("error here!", err);
          return res.json({ msg: "error here!", err });
        }
        if (result) {
          let payload = {
            userId: matchEmail._id,
            role : matchEmail.role
          };
          let token = jwt.sign(payload, process.env.JWT_SECREATE_KEY, {expiresIn: "48h"});
          console.log("User Log in successful!", token);
          return res.json({ msg: "User Log in successful!", token });
        } else {
          console.log("Invalid password!");
          return res.json({ msg: "Invalid password!" });
        }
      });
    }
  } catch (error) {
    console.log("error in log in route!", err);
    return res.json({ msg: "error in log in route!", err });
  }
});

// user logout
userRouter.post("/logout", async (req, res) => {
  const { token } = req.body;
  try {
    let token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.json({msg: "Invalid token!"})
    }
    const logout = await LogOutModel.create({ token });
    console.log("log out succussfull!", token);
    return res.json({ msg: "log out succussfull!", token });
  } catch (error) {
    console.log("error in log out route!", error);
    return res.json({ msg: "error in log out route!", error });
  }
});

//check users
userRouter.get("/check", async (req, res) => {
  // const {email, password, role} = req.body
  const users = await UserModel.find();
  console.log("check all users!", users);
  res.json({ msg: "check all users!", users });
});

export default userRouter;
