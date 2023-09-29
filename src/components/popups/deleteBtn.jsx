import { useState } from "react";
import { deleteQuizByQuizCode } from "../../api/userApi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";
import { IoWarningOutline } from "react-icons/io5";
const DeleteBtn = (props) => {
  const { quizCode, deleted } = props;
  const [btnClicked, setBtnClicked] = useState(false);
  const handleConfirmDelete = async () => {
    setBtnClicked(true);
    const result = await deleteQuizByQuizCode(quizCode);
    if (result) {
      deleted();
    }
  };
  return (
    <Popup
      modal
      trigger={
        <button className="button delete-button btn-size">Delete</button>
      }
      contentStyle={{
        borderRadius: "10px",
        padding: "10px",
        background: "#fff",
        width: `auto`,
      }}
    >
      {(close) => (
        <div className="popup-container">
          <IoWarningOutline color="orange" size={80} />
          <h4>Are you sure you want to Delete?</h4>
          <p>
            Quiz Code: <b>{quizCode}</b>
          </p>
          <div>
            <button
              className="button confirm-btn"
              onClick={handleConfirmDelete}
              disabled={btnClicked}
            >
              Confirm
            </button>
            <button className="button cancel-btn" onClick={close}>
              Cancel
            </button>
          </div>
          {btnClicked && close()}
        </div>
      )}
    </Popup>
  );
};

export default DeleteBtn;
