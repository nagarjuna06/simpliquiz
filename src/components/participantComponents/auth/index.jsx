import { useState } from "react";
import quizJoinImage from "../../../assets/join-quiz.jpg";
import { toast } from "react-toastify";
import "./index.css";
// import Timer, { validEmail } from "../../timer";
import Timer from "../../smallComponents/timer";
import { validEmail } from "../../smallComponents/validations";
import { Link, useNavigate } from "react-router-dom";
import {
  Authentication,
  verifyAuthentication,
} from "../../../api/partcipantApi";
const blockInput = "block-input";
const ParticipantAuth = () => {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [formData, setFormData] = useState({});
  const [disableBtn, setDisableBtn] = useState({ email: false, name: false });
  const [disableResendBtn, setDisableResendBtn] = useState(true);
  const timeEnded = () => {
    setDisableResendBtn(false);
  };
  const handleResendOtpBtnClick = () => {
    sendOtp(formData);
    setDisableResendBtn(true);
  };
  const sendOtp = async (data) => {
    const result = await Authentication(data);
    if (result) {
      setShowOtpInput(true);
    } else {
      setShowNameInput(true);
    }
  };
  const verifyOtp = async (data) => {
    const result = await verifyAuthentication(data);
    if (result) {
      navigate("/participant-dashboard");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (showOtpInput) {
      const { otp } = data;
      if (otp === "") {
        toast.error("OTP Field is Required!");
      } else if (otp.length < 6 || otp.length > 6) {
        toast.error("OTP must be 6 digits!");
      } else {
        setFormData((prev) => ({ ...prev, ...data }));
        verifyOtp({ ...formData, ...data });
      }
    } else if (showNameInput) {
      const { name } = data;
      if (name === "") {
        toast.error("Name Field is Required!");
      } else {
        setFormData((prev) => ({ ...prev, ...data }));
        setDisableBtn((prev) => ({ ...prev, name: true }));
        sendOtp({ ...formData, ...data });
      }
    } else {
      const { email } = data;
      if (email === "") {
        toast.error(validEmail.emptyMsg);
      } else if (!validEmail.reg.test(email)) {
        toast.error(validEmail.regMsg);
      } else {
        setFormData((prev) => ({ ...prev, ...data }));
        setDisableBtn((prev) => ({ ...prev, email: true }));
        sendOtp(data);
      }
    }
  };

  return (
    <form className="join-form" onSubmit={handleFormSubmit}>
      <img src={quizJoinImage} />
      <h3>Participant Authentication</h3>
      <input
        name="email"
        type="text"
        placeholder="Email"
        className={disableBtn.email ? blockInput : ""}
        disabled={disableBtn.email}
      />
      {showNameInput && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          maxLength={30}
          className={disableBtn.name ? blockInput : ""}
          disabled={disableBtn.name}
        />
      )}
      {showOtpInput && (
        <input type="number" placeholder="Enter OTP" name="otp" />
      )}
      {showOtpInput ? (
        <div className="join-quiz-btn-container">
          <button
            type="button"
            className={`button resend-otp ${
              disableResendBtn ? blockInput : ""
            }`}
            disabled={disableResendBtn}
            onClick={handleResendOtpBtnClick}
          >
            {disableResendBtn ? (
              <Timer timeInMinutes={1} timerEnd={timeEnded} removeStyles />
            ) : (
              "Resend Otp"
            )}
          </button>
          <button type="submit" className="button verify btn-number">
            verify
          </button>
        </div>
      ) : (
        <button className="button" type="submit">
          proceed
        </button>
      )}

      <span className="login-context space-around">
        Back to
        <Link to="/"> Home</Link>
      </span>
    </form>
  );
};

export default ParticipantAuth;
