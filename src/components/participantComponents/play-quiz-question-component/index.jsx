import { useState } from "react";
import "./index.css";
import ReactAceEditor from "../../react-ace-code";
import { toast } from "react-toastify";
const QuestionComponent = (props) => {
  const { data, save, skip } = props;
  const { question, options, code, questionId } = data;
  const [selectedOption, setSelectedOption] = useState("");
  //input onchange event
  const handleInputClicked = (e) => {
    if (e.target.childNodes.length > 0) {
      e.target.childNodes[0].checked = true;
      setSelectedOption(e.target.childNodes[0].value);
    }
  };

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (formData.selected === undefined) {
      toast.warn("Please Select the Option!");
    } else {
      save(formData);
    }
  };

  const handleRadioBtn = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="play-quiz-question">
      <form className="question-form no-space" onSubmit={handleFormSubmitted}>
        <label className="question">Q. {question}</label>
        <input type="hidden" name="questionId" value={questionId} />
        {code !== null && <ReactAceEditor code={code} />}
        {options.map((each) => (
          <div
            key={each}
            className={`option ${
              selectedOption === each ? "option-selected" : ""
            }`}
            onClick={handleInputClicked}
          >
            <input
              type="radio"
              name="selected"
              id={each}
              value={each}
              onClick={handleRadioBtn}
            />
            <label htmlFor={each}>{each}</label>
          </div>
        ))}
        <br />
        <div className="question-btn-container">
          <button
            className="button question-btn-light"
            type="button"
            onClick={skip}
          >
            Skip Question
          </button>
          <button className="button question-btn" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionComponent;
