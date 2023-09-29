import "./index.css";
import { useEffect, useState } from "react";
import CreateNewQuizBtn from "../../popups/newBtn";
import QuizCodeItem from "../quizCodeItem";
import Navbar from "../navbar";
import {
  RenderLoading,
  RenderNotDataFound,
} from "../../smallComponents/loadingComponent";
import { apiStatusConstants } from "../../../api/apiLinks";
import { dashboard } from "../../../api/userApi";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [activeQuizCode, setAcitiveQuizCode] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading);
  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const response = await dashboard();
    setData(response);
    if (response.length > 0) {
      setApiStatus(apiStatusConstants.notEmpty);
    } else {
      setApiStatus(apiStatusConstants.empty);
    }
  };

  //call back function
  const quizCodeRefresh = () => {
    setApiStatus(apiStatusConstants.loading);
    apiCall();
  };

  const handleQuizCode = (quizCode) => {
    if (quizCode === activeQuizCode) {
      setAcitiveQuizCode("");
    } else {
      setAcitiveQuizCode(quizCode);
    }
  };
  //quiz list
  const renderQuizList = () => {
    return (
      <ul className="quiz-code-list">
        {data.map((each) => (
          <QuizCodeItem
            key={each.quizCode}
            item={each}
            isActive={each.quizCode === activeQuizCode}
            handleQuizCode={handleQuizCode}
            deleted={quizCodeRefresh}
          />
        ))}
      </ul>
    );
  };

  const renderComponents = () => {
    switch (apiStatus) {
      case apiStatusConstants.empty:
        return <RenderNotDataFound msg="Empty!" />;
      case apiStatusConstants.notEmpty:
        return renderQuizList();
      default:
        return <RenderLoading />;
    }
  };
  return (
    <div className="dashboard-container">
      <Navbar heading="Quiz Dashboard" userName={"_name"} />
      <div className="dashboard-main-container">
        {(apiStatus === apiStatusConstants.empty ||
          apiStatus === apiStatusConstants.notEmpty) && (
          <CreateNewQuizBtn width={320} created={quizCodeRefresh} />
        )}
        {renderComponents()}
      </div>
    </div>
  );
};

export default Dashboard;
