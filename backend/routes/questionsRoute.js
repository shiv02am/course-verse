import express from "express";
const router = express.Router();
import {
  searchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  addAnswer,
  deleteAnswer,
  getUserAnswer,
  getUserQuestions,
} from "../controllers/questionsController.js";
import { isAuthenticated } from "../middlewares/auth.js";

//Search Question By Text
router.route("/questions/search").post(isAuthenticated, searchQuestions);

//Create a Question
router.route("/questions/create").post(isAuthenticated, createQuestion);

//Update a Question
router.route("/questions/update/:id").put(isAuthenticated, updateQuestion);

// Delete a Question
router.route("/questions/delete/:id").delete(isAuthenticated, deleteQuestion);

//Get all User questions
router.route("/questions/all").get(isAuthenticated, getUserQuestions);

//Get a Question
router.route("/questions/:id").get(isAuthenticated, getQuestion);

//get User Answer for a question
router.route("/questions/answers/:id").get(isAuthenticated, getUserAnswer);

//Add / update User answer in a question
router.route("/questions/answers/:id").post(isAuthenticated, addAnswer);

//delete answer in a question
router.route("/questions/answers/:id").delete(isAuthenticated, deleteAnswer);
export default router;
