import mongoose from "mongoose";

const schema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: true,
  },
  answersList: [
    {
      answer: {
        type: String,
        trim: true,
        required: [true, "Answer is Required"],
      },
      answeredBy: {
        userName: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    },
  ],
  askedBy: {
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", schema);
export default Question;
