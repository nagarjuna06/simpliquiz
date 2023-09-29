import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import quizImage from "../../../assets/quiz-main-image.jpg";
import quizPracticeImage from "../../../assets/quiz-practice.jpg";
import quizJoinImage from "../../../assets/quiz-join.jpg";
import quizConductImage from "../../../assets/quiz-conduct.jpg";
const links = {
  practice: "/practice",
  conductQuiz: "/dashboard",
  joinQuiz: "/participant-dashboard",
};

const Home = () => {
  const [image, setImage] = useState(quizImage);
  const handleMouseLeaved = () => {
    setImage(quizImage);
  };
  const handlePracticeBtnHover = () => {
    setImage(quizPracticeImage);
  };

  const handleQuizConductBtnHover = () => {
    setImage(quizConductImage);
  };
  const handleJoinBtnHover = () => {
    setImage(quizJoinImage);
  };
  return (
    <div className="home">
      <img src={image} alt="icon" className="quiz-image" />
      <h3>Welcome to Quiz App!</h3>
      <div className="home-button-container">
        <Link to={links.practice}>
          <button
            className="home-buttons"
            onMouseEnter={handlePracticeBtnHover}
            onMouseLeave={handleMouseLeaved}
          >
            Practice
          </button>
        </Link>
        <Link to={links.conductQuiz}>
          <button
            className="home-buttons"
            onMouseEnter={handleQuizConductBtnHover}
            onMouseLeave={handleMouseLeaved}
          >
            Conduct a Quiz
          </button>
        </Link>

        <Link to={links.joinQuiz}>
          <button
            className="home-buttons"
            onMouseEnter={handleJoinBtnHover}
            onMouseLeave={handleMouseLeaved}
          >
            Join a Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
