import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { participantUrls } from "./apiLinks";

//get user participant_token
const getParticipantToken = () => {
  const Token = Cookies.get("participant_token");
  return {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
};

//get user join_token
const getJoinToken = () => {
  const Token = Cookies.get("join_token");
  return {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
};

export const getParticipantName = () => {
  const Name = Cookies.get("participant_name");
  return Name;
};

//join into quiz authentication
export const Authentication = async (data) => {
  const toastId = toast.loading("Data Syncing....");
  try {
    const res = await axios.post(participantUrls.auth, data);
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: true,
    });
    return true;
  } catch (err) {
    console.log(err);
    toast.update(toastId, {
      render: err.response.data.msg,
      type: "error",
      isLoading: false,
      autoClose: true,
    });
    return false;
  }
};

//verify otp
export const verifyAuthentication = async (data) => {
  const toastId = toast.loading("OTP Verifying....");
  try {
    const res = await axios.post(participantUrls.verify, data);
    toast.update(toastId, {
      render: "OTP verified Successfully!",
      type: "success",
      isLoading: false,
      autoClose: true,
    });
    Cookies.set("participant_token", res.data.jwtToken, { expires: 1 });
    Cookies.set("participant_name", res.data.name, { expires: 1 });
    return true;
  } catch (err) {
    toast.update(toastId, {
      render: err.response.data.msg,
      type: "error",
      isLoading: false,
      autoClose: true,
    });
    return false;
  }
};
//participant dashboard
export const dashboard = async () => {
  try {
    const res = await axios.get(
      participantUrls.dashboard,
      getParticipantToken()
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

//register to quiz

export const registerToQuiz = async (data, form) => {
  data.form = form;
  const toastId = toast.loading("Loading...");
  try {
    const res = await axios.post(
      participantUrls.joinQuiz,
      data,
      getParticipantToken()
    );
    Cookies.set("join_token", res.data.joinToken, { expires: 1 });
    toast.update(toastId, {
      render: `Welcome to ${data.quizCode}`,
      type: "success",
      isLoading: false,
      autoClose: true,
    });
    return true;
  } catch (err) {
    toast.update(toastId, {
      render: err.response.data.msg,
      type: "error",
      isLoading: false,
      autoClose: true,
    });
  }
};

//quiz info call
export const getQuizInfo = async () => {
  const res = await axios.get(participantUrls.quizInfo, getJoinToken());
  return res.data;
};

//get play quiz questions
export const getPlayQuizQuestions = async () => {
  const res = await axios.get(participantUrls.playQuiz, getJoinToken());
  return res.data;
};

//submit quiz
export const submitQuiz = async (data) => {
  const toastId = toast.loading("Quiz Submitting...");
  try {
    const res = await axios.post(
      participantUrls.submitQuiz,
      {
        ...data,
        name: getParticipantName(),
      },
      getJoinToken()
    );
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: true,
    });
    return true;
  } catch (err) {
    console.log(err);
    toast.update(toastId, {
      render: err.response.data.msg,
      type: "error",
      isLoading: false,
      autoClose: true,
    });
    return false;
  }
};

//remove join_token
export const removeJoinToken = () => {
  Cookies.remove("join_token");
};

export const logoutParticipant = () => {
  Cookies.remove("participant_token");
  return true;
};

export const leaderBoardListP = async (quizCode) => {
  try {
    const res = await axios.get(participantUrls.leaderBoard(quizCode));
    return {
      result: true,
      quizCode2: res.data.quizCode,
      list: res.data.data,
      points: res.data.points,
    };
  } catch (err) {
    toast.error(err.response.data.msg);
    return { result: false, msg: err.response.data.msg };
  }
};

export const getParticipantRank = async (quizCode) => {
  try {
    const res = await axios.get(
      participantUrls.rank(quizCode),
      getParticipantToken()
    );
    return res.data.rank;
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const isPraticipantTokenExist = () => {
  const user = Cookies.get("participant_token");
  if (user === undefined) {
    return false;
  }
  return true;
};

export const quizReview = async (quizCode) => {
  try {
    const res = await axios.get(
      participantUrls.review(quizCode),
      getParticipantToken()
    );
    return { data: res.data, result: true };
  } catch (err) {
    toast.error(err.response.data.msg);
    return { result: false, msg: err.response.data.msg };
  }
};
