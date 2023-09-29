import { useEffect } from "react";
import practiceQuizImage from "../../../assets/quiz-practice.jpg";
import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { practiceQuizzesList } from "../../../api/generalApi";

const PracticeQuiz = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const res = await practiceQuizzesList();
    setData(res);
    setFormVisible(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { name, quizName, level, no } = formData;
    if (name === "") {
      toast.error("Name is required field!");
    } else if (quizName == 0 || level == 0 || no == 0) {
      toast.error("Please select the options!");
    } else {
      Cookies.set("quiz_data", JSON.stringify(formData), { expires: 1 });
      navigate("/practice/quiz");
    }
  };
  const renderForm = () => {
    const { quizNames, levels, nos } = data;
    return (
      <form className="practice-form" onSubmit={handleFormSubmit}>
        <input
          className="input-validation"
          type="text"
          name="name"
          placeholder="Enter your Name"
          maxLength={9}
        />
        <div>
          <select name="quizName">
            {quizNames.map((each) => (
              <option value={each.value} key={each.value}>
                {each.label}
              </option>
            ))}
          </select>
          <select name="level">
            {levels.map((each) => (
              <option value={each.value} key={each.value}>
                {each.label}
              </option>
            ))}
          </select>
          <select name="no">
            {nos.map((each) => (
              <option value={each.value} key={each.value}>
                {each.label}
              </option>
            ))}
          </select>
        </div>
        <button className="button">start</button>
        <p className="login-context">
          Back to <Link to="/">Home</Link>
        </p>
      </form>
    );
  };
  const renderLoadingComponent = () => {
    return (
      <div className="practice-loading-container">
        <Oval
          height={50}
          width={80}
          color="#3a41ac"
          visible={true}
          secondaryColor="#3a4111"
          strokeWidth={2}
          strokeWidthSecondary={3}
        />
      </div>
    );
  };
  return (
    <div className="home">
      <img src={practiceQuizImage} alt="quiz-image" className="quiz-image" />
      {formVisible ? renderForm() : renderLoadingComponent()}
    </div>
  );
};

export default PracticeQuiz;
