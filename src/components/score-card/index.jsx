import Cookies from "js-cookie";
import trophy from "../../assets/trophy.jpg";
import "./index.css";
import { Link } from "react-router-dom";
const ScoreCard = () => {
  let data = JSON.parse(Cookies.get("_score"));
  const clearScore = () => {
    Cookies.remove("_score");
  };
  const { quizName, level, score, name, total } = data;
  return (
    <div className="home score-card-change">
      <header className="score-card-head">
        <h1>{quizName}</h1>
        <p>{level}</p>
      </header>
      <div className="score-card-main-container">
        <div className="trophy-image-container">
          <img src={trophy} alt="trophy" className="trophy-image" />
          <p>{name}</p>
        </div>
        <div className="score-container">
          <h4>You Scored:</h4>
          <p>
            <span className="score">{score}</span>
            <span className="total">/{total}</span>
          </p>
          <div className="score-card-btn-container">
            <Link to="/practice">
              <button className="button score-btn" onClick={clearScore}>
                Play Again
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
