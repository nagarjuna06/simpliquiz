import { IoClose } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";
import { convertDate } from "../userComponents/quizCodeItem";

const InstructionsBtn = (props) => {
  const { instructions } = props;

  const {
    author,
    quizCode,
    quizTime,
    noOfQuestions,
    expires,
    marks,
    negativeMarks,
  } = instructions;
  return (
    <Popup
      open
      modal
      trigger={<button className="button logout-button">Instructions</button>}
      closeOnDocumentClick={false}
      contentStyle={{ width: "auto", borderRadius: "10px" }}
    >
      {(close) => (
        <div className="instruction-popup">
          <div className="popup-close-icon-container">
            <IoClose size={28} onClick={close} />
          </div>
          <div className="instructions-content">
            <div>
              <h1>WELCOME TO {quizCode} QUIZ</h1>
              <p>Read the below instructions carefully:</p>
              <p>
                This Quiz has Prepared by <u>{author}</u>
              </p>
            </div>
            <ol>
              <li>
                <b>Quiz Attempt:</b> You are allowed to attempt the quiz{" "}
                <u>only once</u>. Once you submit the quiz, you won't be able to
                change your answers.
              </li>
              <br />
              <li>
                <b>No of Questions:</b> There are <b>{noOfQuestions}</b> no of
                Questions.
              </li>
              <br />
              <li>
                <b>Question Points:</b> Each question carries <b>{marks}</b>{" "}
                marks.
              </li>
              <br />
              <li>
                <b>Negative Marks:</b> There are negative marks for incorrect
                answer is <b>{negativeMarks}</b>.
              </li>
              <br />
              <li>
                <b>Quiz Expiration:</b> This quiz will expire at{" "}
                <b>{convertDate(expires)}</b>. You won't be able to attempt the
                quiz after the expiration time.
              </li>
              <br />
              <li>
                <b>Quiz Results:</b> You will get to see your answers and
                correct answers only after the quiz has expired.
              </li>
              <br />
              <li>
                <b>Time Limit:</b> There is a <b>{quizTime}</b> Minutes of time
                limit for the quiz. The quiz will exit automatically once the
                time limit is completed.You will finish the Quiz in time.
              </li>
              <br />
              <li>
                <b>Leader Board:</b> You will get a rank on the leader Board
                based on your score in the quiz. The leader Board will be
                published once the quiz has expired.
              </li>
            </ol>
            <br />
            <p>
              Please ensure that you have a stable internet connection before
              attempting the quiz. Also, make sure that you have enough time to
              complete the quiz before starting.
            </p>
            <br />
            <p>
              Once you start the quiz, the timer will begin, and you will have a
              specific amount of time to answer all the questions. Make sure you
              read the questions carefully before answering them. Remember that
              each question carries a certain number of marks, so it's essential
              to answer correctly.
            </p>
            <br />
            <p>
              If you're not sure about an answer, it's better to skip the
              question than to guess and lose marks. Also, remember that there
              are negative marks for incorrect answers, so make sure you answer
              carefully.
            </p>
            <br />
            <p>
              Once you have answered all the questions, make sure you click on
              the submit button before the timer runs out. After the quiz has
              expired, you will get to see your results and your rank on the
              leaderboard.
            </p>
            <br />
            <b>Good Luck and have Fun!</b>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default InstructionsBtn;
