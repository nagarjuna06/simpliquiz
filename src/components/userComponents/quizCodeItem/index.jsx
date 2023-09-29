import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import quizCodeIcon from "../../../assets/quiz-code-icon.png";
import "./index.css";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteBtn from "../../popups/deleteBtn";
import ExtendTimeButton from "../../popups/extendTimeBtn";
import RemainingTimeFormat from "../../smallComponents/remainTimeFormat";
import { getUserName } from "../../../api/userApi";
export const convertDate = (time) => {
  const date = new Date(time);
  return date.toLocaleString("te-IN", { hour12: true });
};
const QuizCodeItem = (props) => {
  const { isActive, handleQuizCode, item, deleted } = props;
  const { quizCode, createdTime, expires, questionsFill, quizCodeId } = item;
  const [displayTable, setDisplayTable] = useState("");
  const [hideExtendTimeBtn, setHideExtendTimeBtn] = useState(false);
  const [showMsg, setShowMsg] = useState(questionsFill);
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
    handleQuizCode(quizCode);
  };
  const TimeEnded = () => {
    setShowMsg(false);
    setHideExtendTimeBtn(true);
  };
  return (
    <li
      className={`quiz-code-item ${
        isActive && "remove-overflow"
      } ${displayTable}`}
    >
      <div className="quiz-code-item-head" onClick={handleDown}>
        <img src={quizCodeIcon} alt="quiz-code-icon" />
        <div>
          <h3>{quizCode}</h3>
          <RemainingTimeFormat value={expires} timeEnded={TimeEnded} />
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
              <td className="table-bold">Created Time:</td>
              <td>{convertDate(createdTime)}</td>
            </tr>
            <tr>
              <td className="table-bold">Expires Time:</td>
              <td>{convertDate(expires)}</td>
            </tr>
            <tr>
              <td className="table-bold">Quiz Status:</td>
              <td
                style={{
                  color: hideExtendTimeBtn
                    ? "brown"
                    : questionsFill
                    ? "green"
                    : "red",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                {hideExtendTimeBtn
                  ? "Expired"
                  : questionsFill
                  ? "Live"
                  : "in Progress"}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="quiz-code-item-btn-container">
          {questionsFill ? (
            <>
              <Link to={`/leader-board/${quizCodeId}`}>
                <button className="button logout-button btn-size">
                  Leader Board
                </button>
              </Link>
              <Link to={quizCodeId}>
                <button className="button logout-button btn-size">View</button>
              </Link>
              {!hideExtendTimeBtn && (
                <WhatsappShareButton
                  url={import.meta.env.VITE_SITE_URL}
                  title={`A quiz prepared by *${getUserName(
                    "_name"
                  )}* is available for participants to join by entering the quiz code: *${quizCode}*\n\n`}
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
              )}
              {!hideExtendTimeBtn && (
                <ExtendTimeButton quizCode={quizCode} extended={deleted} />
              )}
            </>
          ) : (
            <Link to={quizCodeId}>
              <button className="button logout-button btn-size">
                Add Questions
              </button>
            </Link>
          )}
          <DeleteBtn width={300} quizCode={quizCode} deleted={deleted} />
        </div>
        {showMsg && (
          <p>Extend Time button will be enabled upto Quiz expired.</p>
        )}
      </div>
    </li>
  );
};
export default QuizCodeItem;
