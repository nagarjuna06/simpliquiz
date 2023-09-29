import Cookies from "js-cookie";
import "./index.css";
import { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";
import Timer from "../../smallComponents/timer";
import QuizQuestionModel from "../quiz-format";
import { useNavigate } from "react-router-dom";
import { removeQuestion, selectRandomQuestion } from "../../../api/apiLinks";
import { practiceQuizzesQuestions } from "../../../api/generalApi";

let questionObj = [];

//quiz component
const Quiz = () => {
  const navigate = useNavigate();
  const quizData = JSON.parse(Cookies.get("quiz_data"));
  const { name, quizName, level, no } = quizData;
  const [err, setErr] = useState("Question is loading...!");
  const [data, setData] = useState({ time: "", mark: "", skip: "" });
  const [question, setQuestion] = useState({});
  const [countMarks, SetCountMarks] = useState(0);
  const [loadQuestion, setLoadQuestion] = useState(false);
  useEffect(() => {
    apiCall();
  }, []);

  //api calling
  const apiCall = async () => {
    const response = await practiceQuizzesQuestions(quizName, level, no);
    try {
      const { mark, skip, time, data } = response;
      questionObj = data;
      setData({ mark, skip, time });
      setQuestion(selectRandomQuestion(questionObj));
      setLoadQuestion(true);
    } catch (err) {
      setErr(err.message);
    }
  };
  const timeComplete = () => {
    gameOver();
  };
  const gameOver = () => {
    const resultData = {
      name,
      quizName,
      level,
      score: countMarks,
      total: no * data.mark,
    };
    Cookies.set("_score", JSON.stringify(resultData), { expires: 1 });
    Cookies.remove("_quizData");
    navigate("/score-card");
  };
  //load the next question
  const loadNextQuestion = () => {
    setLoadQuestion(false);
    setTimeout(() => {
      if (questionObj.length > 0) {
        setQuestion(selectRandomQuestion(questionObj));
        setLoadQuestion(true);
      } else {
        gameOver();
      }
    }, 200);
  };

  //loading component
  const renderLoadingComponent = () => {
    return (
      <div className="loading-container" height={400}>
        <Watch
          height="80"
          width="80"
          radius="48"
          color="royalblue"
          visible={true}
        />
        <p className="login-context">{err}</p>
      </div>
    );
  };

  const sendData = (marks, questionId) => {
    const { mark } = data;
    if (marks === mark) {
      questionObj = removeQuestion(questionObj, questionId);
    }
    SetCountMarks((prev) => prev + marks);
  };
  //render question component
  const renderQuestionComponent = () => {
    return (
      <QuizQuestionModel
        questionData={question}
        data={data}
        quizName={quizName}
        nextQuestion={loadNextQuestion}
        sendData={sendData}
      />
    );
  };

  const { time } = data;

  //main return
  return (
    <div className="home display-change">
      <header className="quiz-header">
        <div>
          <h2>{quizName} quiz </h2>
          <p>{level} level</p>
        </div>
        <div>
          <center>
            <h3>
              {no - questionObj.length}/{no}
            </h3>
          </center>
          {time && <Timer timeInMinutes={time} timerEnd={timeComplete} />}
        </div>
      </header>
      {loadQuestion ? renderQuestionComponent() : renderLoadingComponent()}
    </div>
  );
};

export default Quiz;
