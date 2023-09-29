import { useState } from "react";
import quizJoinImage from "../../../assets/join-quiz.jpg";
import { toast } from "react-toastify";
import Timer from "../../smallComponents/timer";
import { validEmail, validPassword } from "../../smallComponents/validations";
import { Link, useNavigate } from "react-router-dom";
import { passwordReset, verifyOtpToChangePassword } from "../../../api/userApi";
const blockInput = "block-input";
const PasswordReset = () => {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [formData, setFormData] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  const [disableResendBtn, setDisableResendBtn] = useState(true);
  const timeEnded = () => {
    setDisableResendBtn(false);
  };
  const handleResendOtpBtnClick = () => {
    sendOtp(formData);
    setDisableResendBtn(true);
  };
  const sendOtp = async (data) => {
    const result = await passwordReset(data);
    if (result) {
      setShowOtpInput(true);
      setDisableBtn(true);
    }
  };
  const verifyOtp = async (data) => {
    const result = await verifyOtpToChangePassword(data);
    if (result) {
      navigate("/login");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (showOtpInput) {
      const { password, confirmPassword, otp } = data;
      if (otp === "") {
        toast.error("OTP Field is Required!");
      } else if (otp.length < 6 || otp.length > 6) {
        toast.error("OTP must be 6 digits!");
      } else if (password === "") {
        toast.error(validPassword.emptyMsg);
      } else if (!validPassword.reg.test(password)) {
        toast.error(validPassword.regMsg);
      } else if (password !== confirmPassword) {
        toast.error("Password and Confirm Password are not matched!");
      } else {
        setFormData((prev) => ({ ...prev, ...data }));
        verifyOtp({ ...formData, ...data });
      }
    } else {
      const { email } = data;
      if (email === "") {
        toast.error(validEmail.emptyMsg);
      } else if (!validEmail.reg.test(email)) {
        toast.error(validEmail.regMsg);
      } else {
        setFormData((prev) => ({ ...prev, ...data }));
        sendOtp(data);
      }
    }
  };

  return (
    <form className="join-form" onSubmit={handleFormSubmit}>
      <img src={quizJoinImage} />
      <h3>Password Reset</h3>
      <input
        name="email"
        type="text"
        placeholder="Email"
        className={disableBtn ? blockInput : ""}
        disabled={disableBtn}
      />
      {showOtpInput && (
        <>
          <input type="number" placeholder="Enter OTP" name="otp" />
          <input
            type="password"
            placeholder="Enter the Password"
            name="password"
          />
          <input
            type="password"
            placeholder="Renter the Password"
            name="confirmPassword"
          />
        </>
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

export default PasswordReset;
