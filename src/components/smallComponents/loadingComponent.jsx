import { Oval } from "react-loader-spinner";
import "./index.css";

export const RenderLoading = () => {
  return (
    <div className="dashboard-loading">
      <Oval
        height={40}
        width={40}
        color="#3a41ac"
        strokeWidth={3}
        secondaryColor="grey"
      />
    </div>
  );
};

export const RenderNotDataFound = (props) => {
  const { msg } = props;
  return (
    <div className="dashboard-loading">
      <h2>{msg}</h2>
    </div>
  );
};
