import { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import { Correct, Wrong } from "../../smallComponents/correct&Wrong";
import TimeText from "../../smallComponents/timerText";
import OvalLoading from "../../smallComponents/ovalLoading";
import ReactAceEditor from "../../react-ace-code";
import { answerForQuestion } from "../../../api/generalApi";

const QuizQuestionModel = (props) => {
  const { data, questionData } = props;
  const { question, options, code, questionId } = questionData;
  const [selectedOption, setSelectedOption] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  //button disable
  const [disableBtns, setDisableBtns] = useState({
    submitBtn: false,
    showAnsBtn: true,
    skipBtn: true,
    skipBtnDepend: false,
  });

  //onchange from event

  //form submitted
  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (formData.selected === undefined) {
      toast.warn("Please Select the Option");
    } else {
      setDisableBtns({ submitBtn: true, showAnsBtn: true, skipBtn: true });
      setSelectedOption(formData.selected);
      ApiCall();
    }
  };

  //api call
  const ApiCall = async () => {
    const response = await answerForQuestion(questionId);
    setAnswerCorrect(response.answer === selectedOption);
    setQuestionSubmitted(true);
    setDisableInput(true);
    setAnswers(response);
    const { mark } = data;
    const { sendData } = props;
    const marks = response.answer === selectedOption ? mark : -1;
    sendData(marks, questionId);
  };

  //input onchange event
  const handleInputClicked = (e) => {
    if (e.target.childNodes.length > 0 && !questionSubmitted) {
      e.target.childNodes[0].checked = true;
      setSelectedOption(e.target.childNodes[0].value);
    } else if (!questionSubmitted) {
      setSelectedOption(e.target.value);
    }
  };

  //skip timeout method
  const handleSkipTimeEnd = () => {
    setDisableBtns({ showAnsBtn: false, skipBtn: false, submitBtn: false });
  };

  const handleNextBtnClicked = () => {
    const { nextQuestion } = props;
    nextQuestion();
  };
  //result
  const renderMarks = () => {
    const { mark } = data;
    const { explanation } = answers;
    return (
      <div className="question-marks-container">
        {!answerCorrect && (
          <details>
            <summary>Explantion</summary>
            &emsp;&emsp;{explanation}
          </details>
        )}
        <div>
          {answerCorrect ? <Correct size={45} /> : <Wrong size={45} />}
          <h1>{answerCorrect ? "+" + mark : "-1"}</h1>
        </div>
        <button
          className="button question-btn"
          type="button"
          onClick={handleNextBtnClicked}
        >
          next
        </button>
      </div>
    );
  };

  //buttons
  const renderButtons = () => {
    const { skip } = data;
    const { nextQuestion } = props;
    const { submitBtn, showAnsBtn, skipBtn, skipBtnDepend } = disableBtns;
    return (
      <div>
        <div className="question-btn-container">
          <button
            onClick={ApiCall}
            className={`button question-btn-light ${
              showAnsBtn && "btn-disabled"
            }`}
            type="button"
            disabled={showAnsBtn}
          >
            {skipBtn && skipBtnDepend ? <OvalLoading type /> : "Show Answer"}
          </button>
          <button
            className={`button question-btn ${submitBtn && "btn-disabled"}`}
            disabled={submitBtn}
            type="submit"
          >
            {submitBtn ? <OvalLoading /> : "Submit"}
          </button>
          <button
            className={`button question-btn-light ${skipBtn && "btn-disabled"}`}
            type="button"
            disabled={skipBtn}
            onClick={nextQuestion}
          >
            Skip
          </button>
        </div>
        <TimeText
          skip={skip}
          skipTimeEnded={handleSkipTimeEnd}
          stop={questionSubmitted}
        />
      </div>
    );
  };

  //render icons
  const renderCorrectWrongIcons = (each) => {
    const { answer } = answers;
    return (
      <>
        {each === answer && <Correct size={25} />}
        {answerCorrect ? "" : each === selectedOption && <Wrong size={25} />}
      </>
    );
  };

  //send label color
  const sendLabelColor = (each) => {
    if ((each === answers.answer) & questionSubmitted) {
      return "green";
    } else if (
      questionSubmitted &&
      !answerCorrect & (each === selectedOption)
    ) {
      return "red";
    }
  };

  //main return
  return (
    <form className="question-form" onSubmit={handleFormSubmitted}>
      <label className="question">Q. {question}</label>
      {code !== null && <ReactAceEditor code={code} />}
      {options.map((each) => (
        <div
          key={each}
          className={`option ${
            selectedOption === each && !questionSubmitted
              ? "option-selected"
              : ""
          }`}
          onClick={handleInputClicked}
        >
          <input
            type="radio"
            name="selected"
            id={each}
            value={each}
            disabled={disableInput}
          />
          <label htmlFor={each} className={sendLabelColor(each)}>
            {each}
          </label>
          {questionSubmitted && renderCorrectWrongIcons(each)}
        </div>
      ))}
      {/* <p className="err-text warning-color">{err}</p> */}
      {questionSubmitted ? renderMarks() : renderButtons()}
    </form>
  );
};

export default QuizQuestionModel;
