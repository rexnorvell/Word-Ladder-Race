import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <TextBlock className="GameIntro" text="Game goes here!" />
        <Button
          text="Back"
          color="secondary"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>
    </div>
  );
}

export default Game;
