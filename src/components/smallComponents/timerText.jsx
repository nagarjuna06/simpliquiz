import { useEffect, useState } from "react";
import "./index.css";
const TimeText = (props) => {
  const [time, setTime] = useState(props.skip);
  useEffect(() => {
    setTimeout(() => {
      if (!props.stop) {
        if (time > 0) {
          setTime((prev) => prev - 1);
        } else {
          props.skipTimeEnded();
        }
      }
    }, 1000);
  }, [time]);

  return time > 0 ? (
    <p className="skip-text">
      Show Answer & Skip button enabled in {time} Seconds
    </p>
  ) : null;
};

export default TimeText;
