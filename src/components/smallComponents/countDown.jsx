import { useEffect, useState } from "react";
import "./index.css";
const RenderCountDown = (props) => {
  const { count, timeEnded } = props;
  const [counter, setCounter] = useState(count);
  const [stopAnimation, setStopAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (counter - 1 >= 1) {
        setCounter((prev) => prev - 1);
      } else {
        setCounter("Start!");
        setStopAnimation(true);
        setTimeout(() => {
          timeEnded();
        }, 500);
      }
    }, 1000);
  }, [counter]);
  return (
    <div className="dashboard-loading background-image">
      <p className={`count-text ${!stopAnimation && "count-text-animation"}`}>
        {counter}
      </p>
    </div>
  );
};

export default RenderCountDown;
