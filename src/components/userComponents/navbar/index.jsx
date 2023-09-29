import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../../popups/logoutBtn";
import { RxDashboard } from "react-icons/rx";
import { getUserName } from "../../../api/userApi";
import {
  getParticipantName,
  logoutParticipant,
} from "../../../api/partcipantApi";
const Navbar = (props) => {
  const { heading = "Dashboard", dashboard } = props;
  return (
    <header>
      <div>
        <h2>{heading}</h2>
        <p>{getUserName()}</p>
      </div>
      <div className="add-question-btn-container">
        {dashboard && (
          <Link to="/dashboard">
            <RxDashboard size={20} className="dashboard-btn" />
          </Link>
        )}
        <LogoutButton width={300} />
      </div>
    </header>
  );
};

export default Navbar;

export const ParticipantNavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const result = logoutParticipant();
    if (result) {
      navigate("/participant-auth");
    }
  };
  return (
    <header>
      <div>
        <h2>Dashboard</h2>
        <p>{getParticipantName()}</p>
      </div>
      <button
        className="button join-button participant-logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};
