import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/userApi";
import Popup from "reactjs-popup";
import { IoWarningOutline } from "react-icons/io5";
import "reactjs-popup/dist/index.css";
import "./index.css";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogoutBtn = () => {
    const result = logoutUser();
    if (result) {
      navigate("/login");
    }
  };
  return (
    <Popup
      modal
      trigger={<button className="button logout-button">Logout</button>}
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
          <h4>Are you sure you want to Logout?</h4>
          <div>
            <button className="button confirm-btn" onClick={handleLogoutBtn}>
              Confirm
            </button>
            <button className="button cancel-btn" onClick={close}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default LogoutButton;
