import Button from "../components/Button/Button";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";
import Table from "../components/Table/Table";
import { getLeaderboardEntries } from "../services/api";
import type { LeaderboardEntry } from "../types/LeaderboardEntry";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { AlertInfo } from "../types/AlertInfo";
import Alert from "../components/Alert/Alert";

function Home() {
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    LeaderboardEntry[]
  >([]);
  const [alert, setAlert] = useState<AlertInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    loadLeaderboardEntries();
  }, []);

  async function loadLeaderboardEntries() {
    try {
      const data = await getLeaderboardEntries();
      setLeaderboardEntries(data);
    } catch (err) {
      setAlert({
        message: `${err}`,
        type: "error",
      });
      console.error(err);
    }
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <TextBlock size={4}>
          <strong>Welcome to Rex's Word Ladder Race!</strong>
        </TextBlock>
        <TextBlock size={6}>
          A <em>word ladder</em> is a chain of words that differ by only one
          letter. For example,{" "}
          <em>
            Pork {">"} Park {">"} Bark {">"} Barn
          </em>{" "}
          is a word ladder!
        </TextBlock>
        <TextBlock size={6}>
          In the game, players are shown a series of definitions that correspond
          to words. To guess a word, simply type it in the text box at the
          bottom of the word grid. If a guess is{" "}
          <span style={{ color: "var(--success-color)" }}>
            <strong>correct</strong>
          </span>
          , the word will appear beside its definition.
        </TextBlock>
        <TextBlock size={6}>
          The goal is to guess all words in the ladder as <em>quickly</em> as
          possible. Climb the leaderboards as you face off against other players
          in this fast-paced puzzle-solving game!
        </TextBlock>
        <Button
          text="Play"
          color="primary"
          onClick={() => {
            navigate("/game");
          }}
        />
        {leaderboardEntries.length > 0 && (
          <Table title="Leaderboard" entries={leaderboardEntries} />
        )}
        {alert && <Alert text={alert.message} type={alert.type} />}
      </div>
    </div>
  );
}

export default Home;
