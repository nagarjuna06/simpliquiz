import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/generalComponents/home";
import Login from "./components/userComponents/login";
import PracticeQuiz from "./components/generalComponents/practice";
import Quiz from "./components/generalComponents/practice-quiz";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import {
  ProtectConductQuiz,
  ProtectParticipantRoute,
  ProtectPlayQuizRoute,
  ProtectScoreCard,
  ProtectedQuizRoute,
} from "./components/protectedRoute";
import ScoreCard from "./components/score-card";
import SignUp from "./components/userComponents/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Offline, Online } from "./components/smallComponents/msgs";
import Dashboard from "./components/userComponents/dashboard";
import AddQuestions from "./components/userComponents/addQuestions";
import ParticipantAuth from "./components/participantComponents/auth";
import ParticipantDashboard from "./components/participantComponents/dashboard";
import PlayQuiz from "./components/participantComponents/play-quiz";
import LeaderBoard from "./components/leaderBoard";
import ReviewQuiz from "./components/participantComponents/review";
import PasswordReset from "./components/userComponents/password-reset";
import { useEffect } from "react";
import { removeJoinToken } from "./api/partcipantApi";
let toastId;
//online event
window.addEventListener("offline", () => {
  toastId = toast(<Offline />, {
    icon: () => <BiWifiOff size={30} className="offline-icon" color="red" />,
    closeOnClick: false,
    autoClose: false,
    closeButton: false,
  });
});

//offline event
window.addEventListener("online", () => {
  toast.update(toastId, {
    render: <Online />,
    icon: () => <BiWifi size={40} color="lightgreen" />,
    autoClose: true,
    type: "success",
  });
});
function App() {
  window.addEventListener("copy", () => navigator.clipboard.writeText(""));
  useEffect(() => {
    removeJoinToken();
  });
  return (
    <div className="bg-container">
      <ToastContainer position="top-center" theme="dark" limit={3} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />
        <Route exact path="/practice" element={<PracticeQuiz />} />
        <Route
          exact
          path="/score-card"
          element={
            <ProtectScoreCard>
              <ScoreCard />
            </ProtectScoreCard>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <ProtectConductQuiz>
              <Dashboard />
            </ProtectConductQuiz>
          }
        />
        <Route exact path="/dashboard/:quizCodeId" element={<AddQuestions />} />
        <Route
          exact
          path="/practice/quiz"
          element={
            <ProtectedQuizRoute>
              <Quiz />
            </ProtectedQuizRoute>
          }
        />
        <Route exact path="/participant-auth" element={<ParticipantAuth />} />
        <Route
          exact
          path="/participant-dashboard"
          element={
            <ProtectParticipantRoute>
              <ParticipantDashboard />
            </ProtectParticipantRoute>
          }
        />
        <Route
          exact
          path="/participant-review/:quizCode"
          element={
            <ProtectParticipantRoute>
              <ReviewQuiz />
            </ProtectParticipantRoute>
          }
        />
        <Route
          exact
          path="/play-quiz"
          element={
            <ProtectPlayQuizRoute>
              <PlayQuiz />
            </ProtectPlayQuizRoute>
          }
        />
        <Route path="/leader-board/:quizCode" element={<LeaderBoard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
