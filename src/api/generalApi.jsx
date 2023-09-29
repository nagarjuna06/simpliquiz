import axios from "axios";
import Cookies from "js-cookie";
import { generalUrls } from "./apiLinks";
const apiKey = "844cf471-6df4-4e6d-9f9a-e04179f46253";
const headers = {
  headers: {
    "X-Api-Key": apiKey,
  },
};
// practice quizzes list
export const practiceQuizzesList = async () => {
  const res = await axios(generalUrls.home);
  return res.data;
};

//practice quizzes questions
export const practiceQuizzesQuestions = async (quizName, level, no) => {
  const res = await axios.get(generalUrls.practiceQuiz(quizName, level, no));
  return res.data;
};

//answer api call
export const answerForQuestion = async (questionId) => {
  const res = await axios.get(generalUrls.practiceQuizAns(questionId), headers);
  return res.data;
};
