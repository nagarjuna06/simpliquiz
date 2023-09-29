import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedQuizRoute = (props) => {
  const { children } = props;
  const quizData = Cookies.get("quiz_data");
  if (quizData === undefined) {
    return <Navigate to="/practice" />;
  }
  return children;
};

export const ProtectConductQuiz = (props) => {
  const { children } = props;
  const quizData = Cookies.get("jwt_token");
  const name = Cookies.get("_name");
  if (quizData === undefined || name === undefined) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const ProtectScoreCard = (props) => {
  const { children } = props;
  const quizData = Cookies.get("_score");
  if (quizData === undefined) {
    return <Navigate to="/" />;
  }
  return children;
};
export const ProtectParticipantRoute = (props) => {
  const { children } = props;
  const quizData = Cookies.get("participant_token");
  if (quizData === undefined) {
    return <Navigate to="/participant-auth" />;
  }
  return children;
};
export const ProtectPlayQuizRoute = (props) => {
  const { children } = props;
  const quizData = Cookies.get("join_token");
  if (quizData === undefined) {
    return <Navigate to="/participant-dashboard" />;
  }
  return children;
};
