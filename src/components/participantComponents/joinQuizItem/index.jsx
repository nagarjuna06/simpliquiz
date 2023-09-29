import { useEffect, useState } from "react";
import RemainingTimeFormat from "../../smallComponents/remainTimeFormat";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { convertDate } from "../../userComponents/quizCodeItem";
import quizCodeIcon from "../../../assets/quiz-code-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { registerToQuiz } from "../../../api/partcipantApi";
const QuizItem = (props) => {
  const navigate = useNavigate();
  const { isActive, setQuizActive, item } = props;
  const { quizCode, expires, quizTime, author, played, noOfQuestions, marks } =
    item;
  const [displayTable, setDisplayTable] = useState("");
  const [enableReviewBtn, setEnableReviewBtn] = useState(true);
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setDisplayTable("display-table");
      }, 500);
    } else {
      setDisplayTable("");
    }
  }, [isActive]);
  const handleDown = () => {
    setQuizActive(quizCode);
  };
  const handleJoinButton = async () => {
    const result = await registerToQuiz({ quizCode }, false);
    if (result) {
      navigate("/play-quiz");
    }
  };
  const handleReviewBtn = async () => {
    navigate(`/participant-review/${quizCode}`);
  };
  return (
    <li
      className={`quiz-code-item ${
        isActive && "remove-1-overflow"
      } ${displayTable}`}
    >
      <div className="quiz-code-item-head" onClick={handleDown}>
        <img src={quizCodeIcon} alt="quiz-code-icon" />
        <div>
          <h3>{quizCode}</h3>
          <RemainingTimeFormat
            value={expires}
            timeEnded={() => setEnableReviewBtn(false)}
          />
        </div>
        {isActive ? (
          <BiChevronUpCircle size={25} />
        ) : (
          <BiChevronDownCircle size={25} />
        )}
      </div>
      <div className="quiz-code-item-body">
        <table className="table">
          <tbody>
            <tr>
              <td className="table-bold">Creator:</td>
              <td>{author}</td>
            </tr>
            <tr>
              <td className="table-bold">No.of Questions:</td>
              <td>{noOfQuestions}</td>
            </tr>
            <tr>
              <td className="table-bold">Points:</td>
              <td>{noOfQuestions * marks}</td>
            </tr>
            <tr>
              <td className="table-bold">Time:</td>
              <td>{quizTime} Minutes</td>
            </tr>
            <tr>
              <td className="table-bold">Expires Time:</td>
              <td>{convertDate(expires)}</td>
            </tr>
          </tbody>
        </table>
        <div className="quiz-code-item-btn-container">
          {played ? (
            <>
              <Link to={`/leader-board/${quizCode}`}>
                <button className="button logout-button btn-size">
                  Leader Board
                </button>
              </Link>
              <button
                className={`button resend-otp ${
                  enableReviewBtn ? "block-input" : ""
                }`}
                disabled={enableReviewBtn}
                onClick={handleReviewBtn}
              >
                Review
              </button>
            </>
          ) : (
            <button className="button logout-button" onClick={handleJoinButton}>
              Join
            </button>
          )}
        </div>
        {played && enableReviewBtn && (
          <p>Review Button will be enable after Quiz Expiry.</p>
        )}
      </div>
    </li>
  );
};

export default QuizItem;
