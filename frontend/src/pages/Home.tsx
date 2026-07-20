import Button from "../components/Button/Button";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";
import Table from "../components/Table/Table";
import { getLeaderboardEntries } from "../services/api";
import type { LeaderboardEntry } from "../types/LeaderboardEntry";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    LeaderboardEntry[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeaderboardEntries();
  }, []);

  async function loadLeaderboardEntries() {
    try {
      const data = await getLeaderboardEntries();
      setLeaderboardEntries(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <TextBlock size={4} text="Welcome to Rex's Word Ladder Race!" />
        <TextBlock
          size={6}
          text="A word ladder is a chain of words that differ by only one letter. For example, Pork > Park > Bark > Barn is a word ladder!"
        />
        <TextBlock
          size={6}
          text="In the game, players are shown a series of definitions that correspond to words. To guess a word, simply type it in the text box at the bottom of the word grid. If a guess is correct, the word will appear beside its definition."
        />
        <TextBlock
          size={6}
          text="The goal is to guess all words in the ladder as quickly as possible. Climb the leaderboards as you face off against other players in this fast-paced puzzle-solving game!"
        />
        <Button
          text="Play"
          color="primary"
          onClick={() => {
            navigate("/game");
          }}
        />
        <Table title="Leaderboard" entries={leaderboardEntries} />
      </div>
    </div>
  );
}

export default Home;
