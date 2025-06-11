import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../models/User.js";

//401-not authorized

//To check if user is LoggedIn
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Not Logged In", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});

//To check if user is admin or not
export const authorizedAdmin = catchAsyncError((req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
});

//To check if a user is a subscriber or not
export const authorizedSubscribers = catchAsyncError((req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler(`Only subscribers can access this resource`, 403)
    );
  next();
});
