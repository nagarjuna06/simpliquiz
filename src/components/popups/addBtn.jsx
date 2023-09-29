import "reactjs-popup/dist/index.css";
import "./index.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveQuestion } from "../../api/userApi";
import { v4 as uuid } from "uuid";
import Popup from "reactjs-popup";
import { GoQuestion } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { TbBrandCodepen } from "react-icons/tb";
import ReactAceEditor from "../react-ace-code";
const AddButton = (props) => {
  const { length, quizCodeId, refreshPage } = props;
  const [closeForm, setCloseForm] = useState(false);
  const [codeBtnClicked, setCodeBtnClicked] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [options, setOptions] = useState({});
  const handleCodeBtn = () => {
    setCodeBtnClicked((prev) => !prev);
  };

  //set Component to initial state
  const setInitialState = () => {
    setCloseForm(true);
    setCodeBtnClicked(false);
    setOptions({});
    setDisableBtn(false);
    refreshPage();
    setTimeout(() => {
      setCloseForm(false);
    }, 200);
  };

  //store options in array
  const handleOptions = (e) => {
    setOptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAnswer = (e) => {
    const array = Object.keys(options).map((each) => options[each]);
    if (!array.includes(e.target.value)) {
      toast.error("It is not valid Answer!");
    }
  };
  //api call for save question
  const apiCall = async (data, e) => {
    setDisableBtn(true);
    const response = await saveQuestion(data, length + 1, quizCodeId);
    if (response) {
      setInitialState();
      e.target.reset();
    }
  };
  //form submitted
  const handleQuestionFormSubmit = (e) => {
    e.preventDefault();
    const optionsArray = Object.keys(options).map((each) => options[each]);
    const formData = Object.fromEntries(new FormData(e.target));
    if (optionsArray.includes(formData.answer)) {
      const data = {
        question: formData.question,
        code: null,
        options: optionsArray,
        answer: formData.answer,
        explanation: formData.explanation === "" ? null : formData.explanation,
        questionId: uuid(),
      };
      if ("coding" in formData) {
        const code = { coding: formData.coding, language: formData.language };
        data.code = code;
      }
      apiCall(data, e);
    } else {
      toast.error("It is Invalid Answer!");
    }
  };

  return (
    <Popup
      trigger={
        <button className="button new-button">
          <GoQuestion size={20} />
          Add Question
        </button>
      }
      closeOnDocumentClick={false}
      closeOnEscape={false}
      modal
      contentStyle={{
        borderRadius: "10px",
        padding: "5px",
        background: "#fff",
        width: `auto`,
      }}
    >
      {(close) => (
        <>
          <div className="popup-close-icon-container">
            <IoClose size={28} onClick={close} />
          </div>
          {closeForm && close()}
          <form
            className="prepare-question-form"
            onSubmit={handleQuestionFormSubmit}
            onReset={setInitialState}
            autoComplete="off"
          >
            <h2>Question Form</h2>
            <input
              type="text"
              name="question"
              placeholder="Question"
              required
            />
            {codeBtnClicked ? (
              <div>
                <button
                  type="button"
                  className="button add-question-btn remove-code-btn"
                  onClick={handleCodeBtn}
                >
                  <TbBrandCodepen />
                  Remove Code
                </button>
                <ReactAceEditor
                  list
                  readOnly
                  code={{ coding: "", language: "" }}
                />
              </div>
            ) : (
              <button
                type="button"
                className="button add-question-btn add-code-btn"
                onClick={handleCodeBtn}
              >
                <TbBrandCodepen />
                Add Code
              </button>
            )}
            <div className="prepare-question-form-options-container">
              <input
                type="text"
                name="option1"
                placeholder="option 1"
                onChange={handleOptions}
                required
              />
              <input
                type="text"
                name="option2"
                placeholder="option 2"
                onChange={handleOptions}
                required
              />
              <input
                type="text"
                name="option3"
                placeholder="option 3"
                onChange={handleOptions}
                required
              />
              <input
                type="text"
                name="option4"
                placeholder="option 4"
                onChange={handleOptions}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Select Answer"
              name="answer"
              list="options"
              onBlur={handleAnswer}
            />
            <datalist id="options">
              {Object.keys(options).map((key) => (
                <option key={uuid()} value={options[key]} />
              ))}
            </datalist>
            <input
              type="text"
              name="explanation"
              placeholder="Write Explanation"
            />
            <div className="quiz-code-item-btn-container">
              <button
                type="submit"
                className="button logout-button"
                disabled={disableBtn}
              >
                Add
              </button>
              <button
                type="reset"
                className="button cancel-btn"
                disabled={disableBtn}
              >
                Reset
              </button>
            </div>
          </form>
        </>
      )}
    </Popup>
  );
};

export default AddButton;
