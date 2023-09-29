import "./index.css";
import InstructionBtn from "../../popups/instructionBtn";
import Timer from "../../smallComponents/timer";
import RenderCountDown from "../../smallComponents/countDown";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionComponent from "../play-quiz-question-component";
import {
  apiStatusConstants,
  removeQuestion,
  selectRandomQuestion,
} from "../../../api/apiLinks";
import {
  getParticipantName,
  getPlayQuizQuestions,
  getQuizInfo,
  removeJoinToken,
  submitQuiz,
} from "../../../api/partcipantApi";
import { RenderLoading } from "../../smallComponents/loadingComponent";
import { IoCheckmarkCircle } from "react-icons/io5";
let questionsArray = [];
let quizSubmit = false;
const PlayQuiz = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    quizCode: "",
    quizTime: 0,
    noOfQuestions: "",
    marks: "",
  });
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [getQuestion, setQuestion] = useState({});
  const [startTime, setStartTime] = useState(0);
  const quizInfo = async () => {
    const response = await getQuizInfo();
    setData(response);
  };
  const submitQuizToApi = async (endTime) => {
    const submitData = {
      takenTime: endTime - startTime,
      responseData,
    };
    const result = await submitQuiz(submitData);
    if (result) {
      removeJoinToken();
      setApiStatus(apiStatusConstants.submitted);
    }
  };
  useEffect(() => {
    if (questionsArray.length > 0) {
      setTimeout(() => {
        setQuestion(selectRandomQuestion(questionsArray));
        setLoading(false);
      }, 500);
    } else if (responseData.length > 0) {
      submitQuizToApi(new Date().getTime());
    }
  }, [responseData]);
  const saveQuestionResponse = (data) => {
    setLoading(true);
    setResponseData((prev) => [...prev, data]);
    questionsArray = removeQuestion(questionsArray, data.questionId);
  };

  const handleSkipQuestion = () => {
    setLoading(true);
    setQuestion(selectRandomQuestion(questionsArray));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    quizInfo();
  }, []);

  const getQuestionsFromApi = async () => {
    const response = await getPlayQuizQuestions();
    questionsArray = response;
    setQuestion(selectRandomQuestion(response));
  };
  const quizGameOver = (endTime) => {
    if (!quizSubmit) {
      submitQuizToApi(endTime);
      quizSubmit = true;
    }
  };

  const QuizComponent = () => {
    const { quizCode, quizTime, noOfQuestions } = data;
    return (
      <>
        <header className="play-quiz-header">
          <h2>
            {quizCode}({noOfQuestions})
          </h2>
          <div>
            <center>
              <h3>
                {noOfQuestions - questionsArray.length}/{noOfQuestions}
              </h3>
            </center>
            <Timer timeInMinutes={quizTime} timerEnd={quizGameOver} />
          </div>
        </header>
        <b>{getParticipantName()}</b>
        {loading ? (
          <RenderLoading />
        ) : (
          <QuestionComponent
            data={getQuestion}
            save={saveQuestionResponse}
            skip={handleSkipQuestion}
          />
        )}
      </>
    );
  };
  const handleStartBtn = () => {
    getQuestionsFromApi();
    setApiStatus(apiStatusConstants.countdown);
  };
  const handleExitBtn = () => {
    navigate("/participant-dashboard");
  };
  const InstructionsComponent = () => {
    const { quizCode, quizTime, noOfQuestions, marks } = data;
    return (
      <div className="quiz-time-container">
        <img alt="quiz-time" />
        <table className="quiz-info-table">
          <tbody>
            <tr>
              <td>Quiz Name: </td>
              <td>{quizCode}</td>
            </tr>
            <tr>
              <td>Time : </td>
              <td>{quizTime} Minutes</td>
            </tr>
            <tr>
              <td>Points: </td>
              <td>{noOfQuestions * marks}</td>
            </tr>
          </tbody>
        </table>
        <div className="join-quiz-btn-container">
          <button className="button logout-button" onClick={handleStartBtn}>
            Start
          </button>
          <InstructionBtn instructions={data} />
          <button className="button logout-button" onClick={handleExitBtn}>
            Exit
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (apiStatus === apiStatusConstants.notEmpty) {
      console.log(new Date().toLocaleString());
      setStartTime(new Date().getTime());
    }
  }, [apiStatus]);
  const handleCountDownTime = () => {
    setApiStatus(apiStatusConstants.notEmpty);
  };
  const quizSubmittedComponent = () => {
    const { quizCode } = data;
    return (
      <div className="quiz-submitted-container">
        <h2>{quizCode} QUIZ</h2>
        <IoCheckmarkCircle size={80} color="green" className="tick-zooming" />
        <p>{quizCode} Quiz has been submitted Successfully!</p>
        <div className="quiz-code-item-btn-container">
          <button className="button logout-button" onClick={handleExitBtn}>
            Dashboard
          </button>
          <Link to={`/leader-board/${quizCode}`}>
            <button className="button logout-button" onClick={handleExitBtn}>
              LeaderBoard
            </button>
          </Link>
        </div>
      </div>
    );
  };
  const renderComponents = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return InstructionsComponent();
      case apiStatusConstants.countdown:
        return <RenderCountDown count={5} timeEnded={handleCountDownTime} />;
      case apiStatusConstants.notEmpty:
        return QuizComponent();
      case apiStatusConstants.submitted:
        return quizSubmittedComponent();
      default:
        null;
    }
  };
  return <div className="home no-transition">{renderComponents()}</div>;
};

export default PlayQuiz;
