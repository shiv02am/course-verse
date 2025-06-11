import express from "express";
const router = express.Router();
import {
  getAllCourses,
  createCourse,
  getCourseLectures,
  addLecture,
  deleteCourse,
  deleteLecture,
} from "../controllers/courseController.js";
import { authorizedAdmin, authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

//Get All Courses --Without lectures
router.route("/courses").get(getAllCourses);

//Create a new Course
router
  .route("/createcourse")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

//get Course Lectures && get all lectures of a course && delete course
router
  .route("/course/:id")
  .get(isAuthenticated,authorizedSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizedAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizedAdmin, deleteCourse);

router.route('/lecture').delete(isAuthenticated,authorizedAdmin,deleteLecture);



export default router;
