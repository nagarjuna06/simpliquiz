import { useParams } from "react-router-dom";
import "./index.css";
import {
  RenderLoading,
  RenderNotDataFound,
} from "../smallComponents/loadingComponent";
import { useEffect, useState } from "react";
import { apiStatusConstants } from "../../api/apiLinks";
import ListItem from "./listItem";
import { v4 } from "uuid";
import { BiRefresh } from "react-icons/bi";
import {
  getParticipantRank,
  isPraticipantTokenExist,
  leaderBoardListP,
} from "../../api/partcipantApi";
import { leaderBoardListU } from "../../api/userApi";
const LeaderBoard = () => {
  const params = useParams();
  const { quizCode } = params;
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading);
  const [msg, setMsg] = useState("");
  const [rank, setRank] = useState(0);
  const [data, setData] = useState([]);
  const [points, setPoints] = useState(0);
  const [lastUpadted, setLastUpdated] = useState("");
  const [getQuizCode, setQuizCode] = useState("");
  const apiCall = async () => {
    let response;
    if (quizCode.length <= 10) {
      response = await leaderBoardListP(quizCode);
      rankApiCall();
    } else {
      response = await leaderBoardListU(quizCode);
    }
    const { result, list = [], quizCode2, points } = response;
    if (result) {
      if (list.length > 0) {
        setData(list);
        setPoints(points);
        setQuizCode(quizCode2);
        setApiStatus(apiStatusConstants.notEmpty);
        setLastUpdated(new Date().toLocaleString());
      } else {
        setApiStatus(apiStatusConstants.empty);
        setMsg("No Participations!");
      }
    } else {
      setMsg(response.msg);
      setApiStatus(apiStatusConstants.empty);
    }
  };
  const rankApiCall = async () => {
    if (isPraticipantTokenExist()) {
      const rank = await getParticipantRank(quizCode);
      setRank(rank);
    }
  };
  useEffect(() => {
    apiCall();
  }, []);
  const renderList = () => {
    return (
      <div className="leader-board-list">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              {quizCode.length > 10 && <th>Email</th>}
              <th>Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((each, index) => (
              <ListItem
                no={index + 1}
                item={each}
                key={v4()}
                active={index + 1 === rank}
                points={points}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  const renderComponents = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <RenderLoading />;
      case apiStatusConstants.notEmpty:
        return renderList();
      case apiStatusConstants.empty:
        return <RenderNotDataFound msg={msg} />;
      default:
        return null;
    }
  };
  const refreshBtnClicked = () => {
    setApiStatus(apiStatusConstants.loading);
    apiCall();
  };
  return (
    <div className="dashboard-container leader-board">
      <header>
        <h2>{getQuizCode.length > 10 ? "" : getQuizCode} QUIZ </h2>
        <p>Last Updated: {lastUpadted}</p>
        <div className="refresh-btn-container">
          <button onClick={refreshBtnClicked}>
            <BiRefresh />
            Refresh
          </button>
        </div>
      </header>
      {renderComponents()}
    </div>
  );
};

export default LeaderBoard;
