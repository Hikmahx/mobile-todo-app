import express from "express";
import { body } from "express-validator";
import { getUserById, registerUser } from "../controllers/userController";

const router = express.Router();

// Register user
router.post(
  "/",
  body("firstname", "Please enter your first name").not().isEmpty(),
  body("lastname", "Please enter your last name").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("phone_number", "Please provide your phone number").not().isEmpty(),
  body(
    "password",
    "Please password shouldnt be less than 6 characters"
  ).isLength({ min: 6 }),
  registerUser
);

module.exports = router;