import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";
import { createError } from "../error.js";
import getAge from "../utils/getAge.js";
import Preference from "../models/Preference.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      age: getAge(req.body.dateOfBirth),
    });

    await newUser.save();

    const newPreference = new Preference({ userId: newUser._id });
    await newPreference.save();
    res.status(200).json("Successfully created user.");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User does not exist!"));

    const comparePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!comparePassword) return next(createError(400, "Invalid credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    const { password, ...others } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Successfully logged out.");
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const comparePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (comparePassword) {
      if (req.body.newPassword !== req.body.confirmNewPassword) {
        return res.status(403).json("New passwords do not match!");
      } else {
        if (req.body.password === req.body.newPassword)
          return res.status(403).json("Change to a new password!");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);

        await User.findByIdAndUpdate(
          req.user.id,
          {
            $set: { password: hashedPassword },
          },
          { new: true }
        );
        res.status(200).json("Password changed successfully.");
      }
    } else {
      return res.status(401).json("Incorrect password.");
    }
  } catch (error) {
    console.log(error);
  }
};
