import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import constant from "../constant/index.js";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: [true, "Please provied your emall"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide vaild email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    phone_number: {
      type: String,
      required: [true, "Please provied your  Phone number"],
      max: [14, "Number should not be more than 14 digits"],
      unique: true,
    },

    type: {
      type: String,
      enum: Object.values(constant.ACCOUNT_TYPES),
      default: constant.ACCOUNT_TYPES.USER,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
      number: this.number,
    },
    process.env.JWT_SECT,
    { expiresIn: "7d" }
  );
  return token;
};

export default mongoose.model("User", UserSchema);
