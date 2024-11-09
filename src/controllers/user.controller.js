import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const signUp = asyncHandler(async (req, res) => {
     const { username, email, password } = req.body;

     if (!username || !email || !password) {
          throw new ApiError(400, "All fields are required");
     }

     const existedUser = await User.findOne({
          $or: [{ username }, { email }],
     });

     if (existedUser) {
          throw new ApiError(409, "User with email or username already exists");
     }

     const createdUser = await User.create({
          username: username.toLowerCase(),
          email,
          password,
     });

     const user = await User.findById(createdUser._id).select(
          "-password -refreshToken"
     );

     const accessToken = await createdUser.generateAccessToken();
     const refreshToken = await createdUser.generateRefreshToken();

     createdUser.refreshToken = refreshToken;
     await createdUser.save({ validateBeforeSave: false });

     const options = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
     };

     return res
          .status(201)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new ApiResponse(201, user, "User registered successfully"));
});

const logout = asyncHandler(async (req, res) => {
     await User.findByIdAndUpdate(
          req.user?._id,
          {
               $unset: {
                    refreshToken: 1,
               },
          },
          { new: true }
     );

     const options = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
     };

     return res
          .status(200)
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options)
          .json(new ApiResponse(200, null, "User logged out successfully"));
});

const login = asyncHandler(async (req, res) => {
     const { email, password } = req.body;

     if (!email || !password) {
          throw new ApiError(400, "All fields are required");
     }

     const user = await User.findOne({ email });

     if (!user) {
          throw new ApiError(404, "User not found");
     }

     const isPasswordValid = await user.isPasswordMatch(password);

     if (!isPasswordValid) {
          throw new ApiError(401, "Invalid password");
     }

     const accessToken = await user.generateAccessToken();
     const refreshToken = await user.generateRefreshToken();

     user.refreshToken = refreshToken;
     await user.save({ validateBeforeSave: false });

     const options = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
     };

     return res
          .status(201)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new ApiResponse(201, user, "User logged successfully"));
});

const checkAuth = asyncHandler(async (req, res) => {
     const user = req.user;
     if (!user) {
          throw new ApiError(401, "Unauthorized request");
     }
     return res
          .status(200)
          .json(new ApiResponse(200, user, "User is authenticated"));
});

const getUser = asyncHandler(async (req, res) => {
     return res
          .status(200)
          .json(
               new ApiResponse(
                    200,
                    req.user,
                    "Current User fetched successfully"
               )
          );
});
export { signUp, logout, login, checkAuth, getUser };
