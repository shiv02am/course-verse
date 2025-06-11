import express from "express";
const router = express.Router();
import {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
  deleteMyProfile,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userContoller.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

//To Register a new User
router.route("/register").post(singleUpload, register);

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(logout);

//Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

//Change Password
router.route("/changePassword").put(isAuthenticated, changePassword);

//Update Profile
router.route("/updateprofile").put(isAuthenticated,updateProfile);

//Update Profile Picture

router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload ,updateProfilePicture);

//Forget Password
router.route("/forgetpassword").post(forgetPassword);

//Reset Password
router.route("/resetpassword/:token").put(resetPassword);

//Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//Add to playlist
router.route("/addtoplaylist").post(isAuthenticated,addToPlaylist);

//Remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist);


//------------------------Admin Routes---------------------

//Get All Users

router.route('/admin/users').get(isAuthenticated,authorizedAdmin,getAllUsers);

//Update Role and Delete User
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizedAdmin, updateUserRole)
  .delete(isAuthenticated, authorizedAdmin, deleteUser);
export default router;
