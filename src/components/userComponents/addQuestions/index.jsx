import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import { useEffect, useState } from "react";
import "./index.css";
import {
  RenderLoading,
  RenderNotDataFound,
} from "../../smallComponents/loadingComponent";
import AddButton from "../../popups/addBtn";
import { apiStatusConstants } from "../../../api/apiLinks";
import { quizCodeIdApiCall } from "../../../api/userApi";
import QuestionDataItem from "../questionItem";
const AddQuestions = () => {
  const params = useParams();
  const { quizCodeId } = params;
  const [showAns, setShowAns] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading);
  const [activeQuestionId, setActiveQuestionId] = useState("");
  const [questionItems, setQuestionItems] = useState([]);
  const [quizData, setQuizData] = useState({
    quizCode: "code",
    noOfQuestions: "",
  });

  //apicall
  const apiCall = async () => {
    const response = await quizCodeIdApiCall(quizCodeId);
    if (response.result) {
      setQuizData(response.quizCodeData);
      setQuestionItems(response.questionsData);
      setApiStatus(apiStatusConstants.notEmpty);
    } else {
      setApiStatus(apiStatusConstants.empty);
    }
  };
  //refresh
  const refreshPage = () => {
    setApiStatus(apiStatusConstants.loading);
    apiCall();
  };
  useEffect(() => {
    apiCall();
  }, []);

  //show ans
  const handleShowAns = () => {
    setShowAns((prev) => !prev);
  };

  const updateActiveQuestionId = (questionId) => {
    if (activeQuestionId === questionId) {
      setActiveQuestionId("");
    } else {
      setActiveQuestionId(questionId);
    }
  };
  const renderQuizData = () => {
    const questionsAvailable = questionItems.length !== 0;
    const { questionsFill } = quizData;
    return (
      <>
        <div className="quiz-info">
          <div className="question-item-btn-container">
            {!questionsFill ? (
              <AddButton
                refreshPage={refreshPage}
                length={questionItems.length}
                quizCodeId={quizCodeId}
              />
            ) : (
              <div></div>
            )}
            {/* status */}
            {questionsAvailable && (
              <span
                title="double click to change the status"
                onDoubleClick={handleShowAns}
                style={{
                  fontWeight: 500,
                  color: showAns ? "green" : "red",
                  cursor: "pointer",
                }}
              >
                {showAns ? " REVEAL" : " HIDE"}
              </span>
            )}
          </div>

          {/* list */}
          <ul className="questions-list">
            {questionsAvailable ? (
              questionItems.map((each, index) => (
                <QuestionDataItem
                  no={index + 1}
                  key={each.questionId}
                  item={each}
                  isActive={each.questionId === activeQuestionId}
                  activeQuestionId={updateActiveQuestionId}
                  refreshPage={refreshPage}
                  ansStatus={showAns}
                  questionsFilled={questionsFill}
                />
              ))
            ) : (
              <RenderNotDataFound msg="Empty!" />
            )}
          </ul>
        </div>
      </>
    );
  };
  const renderComponents = () => {
    switch (apiStatus) {
      case apiStatusConstants.empty:
        return <RenderNotDataFound msg="Invalid Quiz Code ID!" />;
      case apiStatusConstants.notEmpty:
        return renderQuizData();
      default:
        return <RenderLoading />;
    }
  };
  const { quizCode, noOfQuestions } = quizData;
  return (
    <div className="dashboard-container">
      <Navbar
        dashboard
        heading={`${quizCode}(${noOfQuestions})`}
        userName={"_name"}
      />
      {renderComponents()}
    </div>
  );
};

export default AddQuestions;
