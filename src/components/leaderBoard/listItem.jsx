import Image1 from "../../assets/1.png";
import Image2 from "../../assets/2.png";
import Image3 from "../../assets/3.png";
import Image4 from "../../assets/4.png";
const convertTime = (time) => {
  const min = Math.floor(time / (1000 * 60));
  const sec = Math.floor((time / 1000) % 60);
  const milli = Math.floor(time % 1000);
  return `${min}:${sec}.${milli}`;
};
const ListItem = (props) => {
  const { item, no, active, points } = props;
  const { name, email = "", score, time } = item;
  const setImage = (no) => {
    switch (no) {
      case 1:
        return Image1;
      case 2:
        return Image2;
      case 3:
        return Image3;
      default:
        return Image4;
    }
  };
  return (
    <tr className={active ? "focus" : ""}>
      <td>{no}</td>
      <td className="leader-board-trophy-image">
        <img src={setImage(no)} alt="trophy" />
        {name}
      </td>
      {email !== "" && <td>{email}</td>}
      <td>{convertTime(time)}</td>
      <td>
        {score}/{points}
      </td>
    </tr>
  );
};

export default ListItem;
