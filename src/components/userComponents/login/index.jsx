import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import quizMasterLogo from "../../../assets/login-image.png";
import "./index.css";
import { toast } from "react-toastify";
import { validEmail, validPassword } from "../../smallComponents/validations";
import { logIn } from "../../../api/userApi";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckbox = () => {
    setShowPassword((prev) => !prev);
  };

  const apiCall = async (data) => {
    const result = await logIn(data);
    if (result) {
      navigate("/dashboard");
    }
  };

  //validate form
  const formSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { email, password } = data;
    if (email === "") {
      toast.error(validEmail.emptyMsg);
    } else if (!validEmail.reg.test(email)) {
      toast.error(validEmail.regMsg);
    } else if (password === "") {
      toast.error(validPassword.emptyMsg);
    } else if (!validPassword.reg.test(password)) {
      toast.error(validPassword.regMsg);
    } else {
      e.target.reset();
      apiCall(data);
    }
  };
  return (
    <form className="login-form" onSubmit={formSubmit}>
      <div className="login-form-image-container">
        <img src={quizMasterLogo} alt="" />
      </div>
      <p className="login-context">Authentication</p>
      <br />
      <input type="text" name="email" placeholder="Email" />
      <br />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
      />
      <br />
      <div className="show-password">
        <div className="show-password-container">
          <input type="checkbox" id="show" onChange={handleCheckbox} />
          <label htmlFor="show">Show Password</label>
        </div>
        <Link className="forgot-password" to="/password-reset">
          Forgot Password?
        </Link>
      </div>
      <br />
      <button className="button">Submit</button>
      <br />
      <p className="login-context">
        Create a account? <Link to="/signup">Signup</Link>
      </p>
      <p className="login-context">
        Back to <Link to="/">Home</Link>
      </p>
    </form>
  );
};

export default Login;
