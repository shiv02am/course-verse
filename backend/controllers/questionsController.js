import catchAsyncError from "../middlewares/catchAsyncError.js";
import Questions from "../models/Question.js";
import ErrorHandler from "../utils/ErrorHandler.js";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

//Search Questions
export const searchQuestions = catchAsyncError(async (req, res, next) => {
  let { search } = req.body;

  // Escape special characters in the user input
  search = escapeRegExp(search);

  const questions = await Questions.find({
    question: {
      $regex: new RegExp(search),
      $options: "i",
    },
  });

  return res.status(200).json({
    success: true,
    questions,
  });
});

//Get a single question
export const getQuestion = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const question = await Questions.findById(id);
  if (!question) return next(new ErrorHandler("Question Not Found", 404));
  console.log(question);
  return res.status(200).json({
    success: true,
    question,
  });
});

//Create a Question
export const createQuestion = catchAsyncError(async (req, res, next) => {
  const { question } = req.body;
  if (!question) return next(new ErrorHandler("Please add Question", 400));
  await Questions.create({
    question,
    askedBy: {
      userName: req.user.name,
      userId: req.user._id,
    },
  });
  return res.status(201).json({
    success: true,
    message: "Question Created.",
  });
});

//Update a Question
export const updateQuestion = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { question: newQuestion } = req.body;
  const ques = await Questions.findById(id);
  if (!ques) return next(new ErrorHandler("Question Not Found", 404));
  ques.question = newQuestion;
  await ques.save();
  return res.status(201).json({
    success: true,
    message: "Question updated",
  });
});

//Delete a Question
export const deleteQuestion = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let question = await Questions.findById(id);
  if (!question) return next(new ErrorHandler("Question Not Found", 404));
  await question.remove();
  return res.status(200).json({
    success: true,
    message: "Question Deleted",
  });
});

//get User questions
export const getUserQuestions = catchAsyncError(async (req, res) => {
  const questions = await Questions.find({
    askedBy: { userName: req.user.name, userId: req.user._id },
  });
  return res.status(200).json({
    succes: true,
    questions,
  });
});

//get Answer
export const getUserAnswer = catchAsyncError(async (req, res) => {
  const { id: questionId } = req.params;
  const userId = req.user._id;
  const question = await Questions.findById(questionId);
  if (!question) {
    return next(new ErrorHandler("Question Doesn't Exist", 404));
  }
  let answer = question.answersList.find(
    (ans) => ans.answeredBy.userId.toString() === userId.toString()
  );

  answer = answer ? answer.answer : "";
  return res.status(200).json({
    success: true,
    answer: answer,
  });
});

//Add/Update Answer for the question
export const addAnswer = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  let question = await Questions.findById(id);
  if (!question) return next(new ErrorHandler("Question Not Found", 404));

  const isAnswerExist = question.answersList.find(
    (ans) => ans.answeredBy.userId.toString() === req.user._id.toString()
  );

  if (isAnswerExist) {
    question.answersList = question.answersList.filter(
      (ans) => ans.answeredBy.userId.toString() != req.user._id.toString()
    );
  }
  question.answersList.push({
    answer: answer,
    answeredBy: {
      userName: req.user.name,
      userId: req.user._id,
    },
  });
  await question.save();
  return res.status(200).json({
    success: true,
    message: "Answer Added",
    answer: answer,
  });
});

//delete Answer for the question
export const deleteAnswer = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  let question = await Questions.findById(id);

  question.answersList = question.answersList.filter(
    (ans) => ans.answeredBy.userId.toString() != req.user._id.toString()
  );
  await question.save();
  return res.status(200).json({
    success: true,
    message: "Answer Deleted",
  });
});
