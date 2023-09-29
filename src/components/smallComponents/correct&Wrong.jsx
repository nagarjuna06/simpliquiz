import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import "./index.css";

export const Correct = ({ size }) => {
  return (
    <IoCheckmarkCircleOutline
      size={size}
      color="green"
      className="circle-icon"
    />
  );
};

export const Wrong = ({ size }) => {
  return (
    <IoCloseCircleOutline color="red" size={size} className="circle-icon" />
  );
};
