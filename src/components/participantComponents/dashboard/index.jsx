import { useEffect, useState } from "react";
import "./index.css";
import {
  RenderLoading,
  RenderNotDataFound,
} from "../../smallComponents/loadingComponent";
import { useNavigate } from "react-router-dom";
import {
  dashboard,
  registerToQuiz,
  removeJoinToken,
} from "../../../api/partcipantApi";
import { ParticipantNavBar } from "../../userComponents/navbar";
import { apiStatusConstants } from "../../../api/apiLinks";
import QuizItem from "../joinQuizItem";

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading);
  const [isActive, setIsActive] = useState("");
  const ApiCall = async () => {
    const result = await dashboard();
    if (result.length > 0) {
      setData(result);
      setApiStatus(apiStatusConstants.notEmpty);
    } else {
      setApiStatus(apiStatusConstants.empty);
    }
  };
  const joinApiCall = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const result = await registerToQuiz(formData, true);
    if (result) {
      navigate("/play-quiz");
    }
  };
  const setActiveQuiz = (quizCode) => {
    if (isActive === quizCode) {
      setIsActive("");
    } else {
      setIsActive(quizCode);
    }
  };
  const renderList = () => {
    return (
      <ul className="quiz-code-list">
        {data.map((each) => (
          <QuizItem
            key={each.quizCode}
            item={each}
            isActive={isActive === each.quizCode}
            setQuizActive={setActiveQuiz}
          />
        ))}
      </ul>
    );
  };
  const renderComponents = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <RenderLoading />;
      case apiStatusConstants.notEmpty:
        return renderList();
      default:
        return <RenderNotDataFound msg="Empty!" />;
    }
  };
  useEffect(() => {
    ApiCall();
  }, []);
  return (
    <div className="dashboard-container">
      <ParticipantNavBar />
      <form className="join-quiz-form" onSubmit={joinApiCall}>
        <div>
          <input
            type="text"
            placeholder="Enter a Join Code"
            required
            name="quizCode"
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            maxLength={10}
          />
          <button className="button join-button">Join</button>
        </div>
      </form>
      {renderComponents()}
    </div>
  );
};

export default ParticipantDashboard;
