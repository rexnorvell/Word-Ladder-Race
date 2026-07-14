import Button from "../components/Button/Button";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";

function Home() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <div className="PageContent">
        <TextBlock
          className="GameIntro"
          text="Welcome to Rex's Word Ladder Race! Climb the leaderboards as you face off against other players in a fast-paced puzzle-solving game."
        />
        <Button text="Play" color="primary"></Button>
        <Button text="Quit" color="secondary"></Button>
      </div>
    </div>
  );
}

export default Home;
