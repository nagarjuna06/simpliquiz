import { useState } from "react";
import { extendQuizTime } from "../../api/userApi";
import Popup from "reactjs-popup";
import { IoClose } from "react-icons/io5";
import "reactjs-popup/dist/index.css";
import "./index.css";

export const ExtendTimeButton = (props) => {
  const { quizCode, extended } = props;
  const [closeForm, setCloseForm] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const apiCall = async (expires) => {
    const data = { expires, quizCode };
    const result = await extendQuizTime(data);
    if (result) {
      extended();
      setCloseForm(true);
    } else {
      setDisableSubmitBtn(false);
    }
  };
  const extendTimeFormSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { days, hours, minutes } = formData;
    const extendTime =
      (parseInt(days) * 24 * 60 + parseInt(hours) * 60 + parseInt(minutes)) *
      60 *
      1000;
    setDisableSubmitBtn(true);
    apiCall(extendTime);
  };
  return (
    <Popup
      modal
      trigger={<button className="button logout-button">Extend Time</button>}
      closeOnDocumentClick={false}
      contentStyle={{ width: "auto", borderRadius: "10px" }}
    >
      {(close) => (
        <>
          <div className="popup-close-icon-container">
            <IoClose size={28} onClick={close} />
          </div>
          <form
            className="quiz-code-form"
            onSubmit={extendTimeFormSubmit}
            autoComplete="off"
          >
            <h3>Extend Time:{quizCode}</h3>
            <br />
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
            <div>
              <button
                type="submit"
                className="button confirm-btn"
                disabled={disableSubmitBtn}
              >
                Extend
              </button>
              <button type="reset" className="button cancel-btn">
                Clear
              </button>
            </div>
          </form>
          {closeForm && close()}
        </>
      )}
    </Popup>
  );
};

export default ExtendTimeButton;
