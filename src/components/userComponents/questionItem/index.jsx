import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { FcQuestions } from "react-icons/fc";
import "./index.css";
import DeleteQuestionBtn from "../../popups/deleteQuestionBtn";
import { useEffect, useState } from "react";
import ReactAceEditor from "../../react-ace-code";
import { deleteQuestionApiCall } from "../../../api/userApi";
const QuestionDataItem = (props) => {
  const {
    item,
    no,
    isActive,
    activeQuestionId,
    ansStatus,
    questionsFilled,
    refreshPage,
  } = props;
  const { question, options, explanation, code, answer, questionId } = item;
  const [displayTable, setDisplayTable] = useState("");
  const handleBtnClick = () => {
    activeQuestionId(questionId);
  };
  const handleDeleteBtn = async () => {
    const response = await deleteQuestionApiCall(questionId);
    if (response) {
      refreshPage();
    }
  };
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setDisplayTable("display-table");
      }, 500);
    } else {
      setDisplayTable("");
    }
  }, [isActive]);

  return (
    <div
      className={`question-item ${
        isActive && "question-remove-overflow"
      } ${displayTable}`}
    >
      <div className="question-item-head" onClick={handleBtnClick}>
        <FcQuestions size={35} />
        <h3>Question :{no}</h3>
        {isActive ? (
          <BiChevronUpCircle size={25} />
        ) : (
          <BiChevronDownCircle size={25} />
        )}
      </div>
      <div className="question-item-body">
        <h4>
          {no}. {question}
        </h4>
        <div>
          {code && (
            <details>
              <summary>code</summary>
              <div>
                <ReactAceEditor code={code} preview />
              </div>
            </details>
          )}
          <details>
            <summary>Options</summary>
            <div>
              {options.map((each, index) => (
                <p key={each}>
                  {String.fromCharCode(65 + index) + ") "} {each}
                </p>
              ))}
            </div>
          </details>
        </div>
        {ansStatus && (
          <details>
            <summary>Show Answer</summary>
            <div>
              <p>
                <b>Answer:</b> {answer}
              </p>
              <p>
                <b>Explanation:</b> {explanation}
              </p>
            </div>
          </details>
        )}
      </div>
      {!questionsFilled && <DeleteQuestionBtn deleted={handleDeleteBtn} />}
    </div>
  );
};

export default QuestionDataItem;
