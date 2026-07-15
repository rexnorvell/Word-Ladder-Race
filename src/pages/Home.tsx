import Button from "../components/Button/Button";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <TextBlock
          className="GameIntro"
          text="Welcome to Rex's Word Ladder Race! Climb the leaderboards as you face off against other players in a fast-paced puzzle-solving game."
        />
        <Button
          text="Play"
          color="primary"
          onClick={() => {
            navigate("/game");
          }}
        />
        <Button text="Quit" color="secondary" />
      </div>
    </div>
  );
}

export default Home;
