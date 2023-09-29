import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { BiTrash } from "react-icons/bi";
import {
  QuizCodeRegisterMsg,
  WelcomeMsg,
} from "../components/smallComponents/msgs";
import { userUrls } from "./apiLinks";

//get user jwt_token
const getJwtToken = () => {
  const jwtToken = Cookies.get("jwt_token");
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

//get name form cookies
export const getUserName = () => {
  const Name = Cookies.get("_name");
  return Name;
};

//sign up api call
export const signup = async (data) => {
  const toastId = toast.loading("Registering...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.post(userUrls.signup, data);
    toast.update(toastId, {
      render: res.data.msg,
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
    return false;
  }
};

//login api call
export const logIn = async (data) => {
  const toastId = toast.loading("Logging...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.post(userUrls.login, data);
    toast.update(toastId, {
      render: <WelcomeMsg name={res.data.name} />,
      type: "success",
      isLoading: false,
      autoClose: true,
      position: "top-right",
      icon: "👋",
    });
    Cookies.set("jwt_token", res.data.jwtToken, { expires: 1 });
    Cookies.set("_name", res.data.name, { expires: 1 });
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

//password reset
export const passwordReset = async (data) => {
  const toastId = toast.loading("Data Syncing...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.post(userUrls.passwordReset, data);
    toast.update(toastId, {
      render: res.data.msg,
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
    return false;
  }
};

//update password
export const verifyOtpToChangePassword = async (data) => {
  const toastId = toast.loading("Password Rest...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.post(userUrls.verifyOtp, data);
    toast.update(toastId, {
      render: res.data.msg,
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
    return false;
  }
};

//user dashboard
export const dashboard = async () => {
  try {
    const res = await axios.get(userUrls.dashboard, getJwtToken());
    return res.data;
  } catch (err) {
    console.log(err);
    toast.error(err.response.msg);
  }
};

//register quiz code
export const registerQuizCode = async (data) => {
  const toastId = toast.loading("registering...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.post(
      userUrls.registerQuiz,
      { ...data, createdUserName: getUserName() },
      getJwtToken()
    );
    toast.update(toastId, {
      render: (
        <QuizCodeRegisterMsg
          quizCode={res.data.quizCode}
          msg={res.data.msg}
          color="lightgreen"
        />
      ),
      type: "success",
      isLoading: false,
      autoClose: true,
      position: "top-right",
      icon: "🥳",
    });
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

//extend time
export const extendQuizTime = async (data) => {
  const { expires, quizCode } = data;
  const toastId = toast.loading("Time Updating...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.post(
      userUrls.extendQuiz(quizCode),
      { expires },
      getJwtToken()
    );
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      autoClose: true,
      isLoading: false,
    });
    return true;
  } catch (err) {
    toast.update(toastId, {
      render: err.response.data.msg,
      type: "error",
      autoClose: true,
      isLoading: false,
    });
    return false;
  }
};

//delete the quiz
export const deleteQuizByQuizCode = async (quizCode) => {
  const toastId = toast.loading("deleting...", {
    autoClose: false,
    closeOnClick: false,
  });
  try {
    const res = await axios.delete(
      userUrls.deleteQuiz(quizCode),
      getJwtToken()
    );
    toast.update(toastId, {
      render: (
        <QuizCodeRegisterMsg
          quizCode={res.data.quizCode}
          msg={res.data.msg}
          color="red"
        />
      ),
      type: "error",
      isLoading: false,
      autoClose: true,
      position: "top-right",
      icon: () => <BiTrash size={30} color="red" />,
    });
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

//logout user
export const logoutUser = () => {
  Cookies.remove("jwt_token");
  Cookies.remove("_name");
  toast.success("Logout successfully!", {
    autoClose: 2000,
  });
  return true;
};

//get quiz by id
export const quizCodeIdApiCall = async (quizCodeId) => {
  try {
    const res = await axios.get(
      userUrls.quizDetails(quizCodeId),
      getJwtToken()
    );
    return { ...res.data, result: true };
  } catch (err) {
    toast.error("Invalid Quiz Code ID");
    return { result: false };
  }
};

//save question
export const saveQuestion = async (question, length, quizCodeId) => {
  const toastId = toast.loading("Loading....");
  try {
    const data = { question, length };
    const res = await axios.post(
      userUrls.addQuestion(quizCodeId),
      data,
      getJwtToken()
    );
    toast.update(toastId, {
      render: res.data.msg,
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
    return false;
  }
};

//delete question
export const deleteQuestionApiCall = async (questionId) => {
  const toastId = toast.loading("Deleting....");
  try {
    const res = await axios.delete(
      userUrls.deleteQuestion(questionId),
      getJwtToken()
    );
    toast.update(toastId, {
      render: res.data.msg,
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
    return false;
  }
};

export const leaderBoardListU = async (quizCodeId) => {
  try {
    const res = await axios.get(
      userUrls.leaderBoard(quizCodeId),
      getJwtToken()
    );
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
