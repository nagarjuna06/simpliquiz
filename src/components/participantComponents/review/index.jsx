import { useParams } from "react-router-dom";
import { getParticipantName, quizReview } from "../../../api/partcipantApi";
import { useState } from "react";
import { apiStatusConstants } from "../../../api/apiLinks";
import {
  RenderLoading,
  RenderNotDataFound,
} from "../../smallComponents/loadingComponent";
import { useEffect } from "react";
import ReviewItem from "./reviewItem";
import { v4 as uuid } from "uuid";
import "./index.css";

const ReviewQuiz = () => {
  const params = useParams();
  const { quizCode } = params;
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading);
  const [data, setData] = useState([]);
  const [mark, setMark] = useState(0);
  const [negativeMark, setNegativeMark] = useState(0);
  const [msg, setMsg] = useState("");
  const [score, setScore] = useState(0);
  const apiCall = async () => {
    const response = await quizReview(quizCode);
    const { result } = response;
    if (result) {
      const { review, points, marks, negativeMarks } = response.data;
      setData(review);
      setScore(points);
      setMark(marks);
      setNegativeMark(negativeMarks);
      setApiStatus(apiStatusConstants.notEmpty);
    } else {
      const { msg } = response;
      setApiStatus(apiStatusConstants.empty);
      setMsg(msg);
    }
  };
  useEffect(() => {
    apiCall();
  }, []);
  const renderList = () => {
    return (
      <>
        <div className="question-item-btn-container">
          <p>
            Your Score:{score}/{data.length * mark}
          </p>
          <p>mark:{mark}</p>
          <p>negative:{negativeMark}</p>
        </div>
        <ul className="quiz-review-list">
          {data.map((each, index) => (
            <ReviewItem
              key={uuid()}
              no={index + 1}
              item={each}
              mark={mark}
              negativeMark={negativeMark}
              totalQuestions={data.length}
            />
          ))}
        </ul>
      </>
    );
  };
  const renderComponents = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <RenderLoading />;
      case apiStatusConstants.empty:
        return <RenderNotDataFound msg={msg} />;
      case apiStatusConstants.notEmpty:
        return renderList();
      default:
        return null;
    }
  };
  return (
    <div className="dashboard-container leader-board">
      <header>
        <h2>{quizCode} QUIZ REVIEW</h2>
        <p>{getParticipantName()}</p>
      </header>
      {renderComponents()}
    </div>
  );
};

export default ReviewQuiz;
