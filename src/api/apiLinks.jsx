const baseUrl = import.meta.env.VITE_BASE_API_URL;

const baseUserUrl = `${baseUrl}/user`;

const baseParticipantUrl = `${baseUrl}/participant`;
export const userUrls = {
  signup: `${baseUserUrl}/signup`, //post
  login: `${baseUserUrl}/login`, //post
  passwordReset: `${baseUserUrl}/password-reset`,
  verifyOtp: `${baseUserUrl}/verify-otp`,
  dashboard: `${baseUserUrl}/dashboard`, //get
  registerQuiz: `${baseUserUrl}/register-quiz`, //post
  quizDetails: (quizCodeId) => `${baseUserUrl}/quiz-details/${quizCodeId}`, //get
  deleteQuiz: (quizCode) => `${baseUserUrl}/delete-quiz/${quizCode}`, //delete
  extendQuiz: (quizCode) => `${baseUserUrl}/extend-quiz/${quizCode}`, //post
  addQuestion: (quizCodeId) => `${baseUserUrl}/add-question/${quizCodeId}`, //post
  deleteQuestion: (quizCodeId) =>
    `${baseUserUrl}/delete-question/${quizCodeId}`, //delete
  leaderBoard: (quizCodeId) => `${baseUserUrl}/leader-board/${quizCodeId}`,
};

export const participantUrls = {
  auth: `${baseParticipantUrl}/auth`, //post
  verify: `${baseParticipantUrl}/verify-otp`, //post
  dashboard: `${baseParticipantUrl}/dashboard`, //get
  joinQuiz: `${baseParticipantUrl}/join-quiz`, //post
  quizInfo: `${baseParticipantUrl}/quiz-info`, //get
  playQuiz: `${baseParticipantUrl}/play-quiz`, //get
  submitQuiz: `${baseParticipantUrl}/submit-quiz`, //post
  leaderBoard: (quizCode) => `${baseParticipantUrl}/leader-board/${quizCode}`, //get
  rank: (quizCode) => `${baseParticipantUrl}/rank/${quizCode}`, //get
  review: (quizCode) => `${baseParticipantUrl}/quiz-review/${quizCode}`, //get
};
export const generalUrls = {
  home: `${baseUrl}/home`,
  practiceQuiz: (quizName, level, no) =>
    `${baseUrl}/practice-quiz/${quizName}?level=${level}&no=${no}`,
  practiceQuizAns: (questionId) =>
    `${baseUrl}/practice-quiz/answer/${questionId}`,
};

//api constants
export const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  countdown: "COUNT DOWN",
  empty: "EMPTY",
  notEmpty: "NOT EMPTY",
  submitted: "SUBMITTED",
};

//select random question
export const selectRandomQuestion = (array) => {
  const index = Math.floor(Math.random() * array.length);
  const question = array[index];
  question.options = question.options.sort(() => Math.random() - 0.5);
  return question;
};

// remove question
export const removeQuestion = (array, questionId) => {
  const result = array.filter((each) => each.questionId !== questionId);
  return result;
};
