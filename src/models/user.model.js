import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
     {
          username: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          password: {
               type: String,
               required: true,
               minLength: 5,
          },
          refreshToken: {
               type: String,
          },
     },
     { timestamps: true }
);

//todo : HASHING PASSWORD BEFORE SAVING
userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next();

     try {
          this.password = await bcrypt.hash(this.password, 10);
          next();
     } catch (error) {
          return next("Error hashing password");
     }
});

//todo: Compare password while logging in

userSchema.methods.isPasswordMatch = async function (password) {
     const match = await bcrypt.compare(password, this.password);
     return match;
};

//todo: generate token

userSchema.methods.generateAccessToken = async function () {
     return jwt.sign(
          {
               _id: this._id,
               username: this.username,
               email: this.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
               expiresIn: "1d",
          }
     );
};

userSchema.methods.generateRefreshToken = async function () {
     return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "10d",
     });
};

export const User = mongoose.model("User", userSchema);
