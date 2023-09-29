export const Online = () => {
  return (
    <div>
      <h4>You're online now</h4>
      <p style={{ color: "grey" }}>Hurray! Internet is connected</p>
    </div>
  );
};

export const Offline = () => {
  return (
    <div>
      <h4>You're offline now</h4>
      <p style={{ color: "grey" }}>Opps! Internet is disconnected</p>
    </div>
  );
};

export const WelcomeMsg = (props) => {
  const { name } = props;
  return (
    <div>
      <h4 style={{ color: "lightgreen" }}>Hi {name},</h4>
      <p>Welcome to Quiz App!</p>
    </div>
  );
};

export const QuizCodeRegisterMsg = (props) => {
  const { quizCode, msg, color } = props;
  return (
    <div>
      <h4 style={{ color: color }}>Quiz Code: {quizCode},</h4>
      <p>{msg}</p>
    </div>
  );
};
