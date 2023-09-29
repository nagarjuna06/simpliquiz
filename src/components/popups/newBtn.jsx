import { useState } from "react";
import { registerQuizCode } from "../../api/userApi";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import "reactjs-popup/dist/index.css";
import "./index.css";

const CreateNewQuizBtn = (props) => {
  const [closeForm, setCloseForm] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const apiCall = async (data) => {
    const result = await registerQuizCode(data);
    const { created } = props;
    if (result) {
      setCloseForm(true);
      created();
    } else {
      setDisableSubmitBtn(false);
    }
  };
  const quizCodeFormSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const {
      quizCode,
      days,
      hours,
      minutes,
      noOfQuestions,
      quizTime,
      negativeMarks,
      marks,
    } = formData;
    const data = {};
    data.expires =
      new Date().getTime() +
      (parseInt(days) * 24 * 60 + parseInt(hours) * 60 + parseInt(minutes)) *
        60 *
        1000;
    data.noOfQuestions = parseInt(noOfQuestions);
    data.quizTime = parseInt(quizTime);
    data.negativeMarks = -1 * parseInt(negativeMarks);
    data.marks = parseInt(marks);
    data.quizCode = quizCode.toUpperCase();
    if (!data.quizCode.includes(" ")) {
      setDisableSubmitBtn(true);
      apiCall(data);
    } else {
      toast.error("In Quiz Code Space not allowed!");
    }
  };
  return (
    <Popup
      modal
      closeOnDocumentClick={false}
      trigger={
        <button className="button new-button">
          <IoAddCircleOutline size={20} />
          Create a New Quiz
        </button>
      }
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
          <form
            className="quiz-code-form"
            onSubmit={quizCodeFormSubmit}
            autoComplete="off"
          >
            <h2>Register Quiz Code</h2>
            <input
              type="text"
              name="quizCode"
              id="quiz-code"
              minLength={5}
              maxLength={10}
              placeholder="Enter Quiz Code Ex: QUIZ20"
              required
            />
            <input
              type="number"
              name="noOfQuestions"
              placeholder="Enter no of Questions"
              min={5}
              max={30}
              required
            />
            <input
              type="number"
              name="quizTime"
              min={5}
              max={50}
              placeholder="Enter Quiz Time in minutes"
              required
            />
            <div className="expire-time-container">
              <label htmlFor="days">
                Expire
                <br />
                Time:
              </label>
              <input
                type="number"
                placeholder="days"
                name="days"
                min={0}
                max={6}
                required
              />
              <span>:</span>
              <input
                type="number"
                placeholder="hours"
                name="hours"
                min={0}
                max={23}
                required
              />
              <span>:</span>
              <input
                type="number"
                placeholder="minutes"
                name="minutes"
                min={0}
                max={59}
                required
              />
            </div>
            <input
              type="number"
              name="marks"
              min={1}
              max={5}
              placeholder="Enter Marks for each question"
              required
            />
            <input
              type="number"
              name="negativeMarks"
              min={0}
              max={5}
              placeholder="Enter Negative Marks for question"
              required
            />
            <div>
              <button
                type="submit"
                className="button confirm-btn"
                disabled={disableSubmitBtn}
              >
                Create
              </button>
              <button type="reset" className="button cancel-btn">
                Reset
              </button>
            </div>
          </form>
          {closeForm && close()}
        </>
      )}
    </Popup>
  );
};

export default CreateNewQuizBtn;
