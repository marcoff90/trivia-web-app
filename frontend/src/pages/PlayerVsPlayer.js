import {useParams} from "react-router-dom";
import Auth from "../services/Auth";

const PlayerVsPlayer = () => {
  let duelId = useParams();
  return (
      <>
        <Auth/>
        <p>Player</p>
      </>
  );
};

export default PlayerVsPlayer;
