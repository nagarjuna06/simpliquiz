import { Oval } from "react-loader-spinner";

const OvalLoading = ({ type }) => {
  return (
    <Oval
      height={22}
      width={22}
      color={type ? "#3a41ac" : "#fff"}
      visible={true}
      secondaryColor="3a4188"
      strokeWidth={3}
      strokeWidthSecondary={4}
    />
  );
};

export default OvalLoading;
