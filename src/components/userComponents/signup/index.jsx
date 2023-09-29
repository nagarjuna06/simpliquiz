import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpImage from "../../../assets/signup-image.png";
import { toast } from "react-toastify";
import { validEmail, validPassword } from "../../smallComponents/validations";
import { signup } from "../../../api/userApi";
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const handleCheckbox = () => {
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  };
  const apiCall = async (data) => {
    const result = await signup(data);
    if (result) {
      navigate("/login");
    }
  };

  //validate form
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { name, email, password, confirm_password } = formData;
    if (name === "") {
      toast.error("Name field is Required!");
    } else if (email === "") {
      toast.error(validEmail.emptyMsg);
    } else if (!validEmail.reg.test(email)) {
      toast.error(validEmail.regMsg);
    } else if (password === "") {
      toast.error(validPassword.emptyMsg);
    } else if (!validPassword.reg.test(password)) {
      toast.error(validPassword.regMsg);
    } else if (password !== confirm_password) {
      toast.error("Password and Confirm Password not matched!");
    } else {
      e.target.reset();
      apiCall(formData);
    }
  };
  return (
    <form className="login-form" onSubmit={formSubmit}>
      <div className="login-form-image-container">
        <img src={signUpImage} alt="" />
      </div>
      <p className="login-context">signUp</p>
      <br />
      <input type="text" name="name" placeholder="Name" />
      <input type="email" name="email" placeholder="Email" />
      <br />
      <input type={showPassword} name="password" placeholder="Password" />
      <br />
      <input
        type={showPassword}
        name="confirm_password"
        placeholder="Confirm Password"
      />
      <br />
      <div className="show-password-container">
        <input type="checkbox" id="show" onChange={handleCheckbox} />
        <label htmlFor="show">Show Password</label>
      </div>
      <br />
      <button className="button">Submit</button>
      <br />
      <p className="login-context">
        Already have a account? <Link to="/login">Login</Link>
      </p>
      <p className="login-context">
        Back to <Link to="/">Home</Link>
      </p>
    </form>
  );
};

export default SignUp;
