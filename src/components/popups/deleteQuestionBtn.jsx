import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { VscTrash } from "react-icons/vsc";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const DeleteQuestionBtn = (props) => {
  const { deleted } = props;
  const [btnClicked, setBtnClicked] = useState(false);
  const handleBtnClick = () => {
    setBtnClicked(true);
    deleted();
  };
  return (
    <Popup
      modal
      trigger={
        <button className="button delete-icon-button">
          <VscTrash size={20} />
          Delete
        </button>
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
          <h4>Are you sure you want to Delete this Question?</h4>
          <div>
            <button className="button confirm-btn" onClick={handleBtnClick}>
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

export default DeleteQuestionBtn;
