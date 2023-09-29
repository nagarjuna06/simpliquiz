import { useEffect, useState } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import "./index.css";
const Timer = (props) => {
  const { timeInMinutes, removeStyles = false, timerEnd } = props;
  const strTime =
    timeInMinutes <= 10 ? `0${timeInMinutes}m00s` : `${timeInMinutes}m00s`;
  const [time, setTime] = useState(strTime);
  const [minutes, setMinutes] = useState(timeInMinutes - 1);
  const [seconds, setSeconds] = useState(59);
  const [timeLess, setTimeLess] = useState(false);
  const [timeOff, setTimeOff] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const strSeconds = seconds < 10 ? `0${seconds}` : seconds;
      const StrFtime = `${strMinutes}m${strSeconds}s`;
      setTime(StrFtime);
      if (minutes === 0 && seconds === 0) {
        setTimeout(() => {
          timerEnd(new Date().getTime());
        }, 300);
      }
      if (minutes !== 0 && seconds === 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);
  }, [time]);

  useEffect(() => {
    if (minutes === 0) {
      setTimeLess(true);
      setTimeOff(false);
    } else if (timeInMinutes - Math.round(timeInMinutes / 2) === minutes) {
      setTimeOff(true);
    }
  }, [minutes]);
  if (removeStyles) {
    return <p className="text-normal">{time}</p>;
  } else {
    return (
      <div className="time-container">
        <div
          className={`time ${timeOff ? "time-off" : timeLess && "time-less"}`}
        >
          <BsFillAlarmFill className="alarm-icon" />
          {time}
        </div>
      </div>
    );
  }
};
export default Timer;
