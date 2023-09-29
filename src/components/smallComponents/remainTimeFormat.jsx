import { useEffect, useState } from "react";

const calculateTimeDifference = (endDate) => {
  const difference = endDate - new Date().getTime();
  var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((difference / (1000 * 60)) % 60);
  var seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const RemainingTimeFormat = (props) => {
  const { value, timeEnded } = props;
  const [timeData, setTimeData] = useState(calculateTimeDifference(value));
  const [isExpired, setIsExpired] = useState(false);
  const checkTime = async () => {
    const { days, hours, minutes, seconds } = timeData;
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      setIsExpired(true);
      timeEnded();
    } else {
      setTimeData(calculateTimeDifference(value));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      checkTime();
    }, 1000);
  }, [timeData]);
  const { days, hours, minutes, seconds } = timeData;

  return isExpired ? (
    <p>Quiz Expired!</p>
  ) : (
    <p>{`${days}d:${hours}h:${minutes}m:${seconds}s`}</p>
  );
};

export default RemainingTimeFormat;
