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
        <Table title="Leaderboard" entries={leaderboardEntries} />
      </div>
    </div>
  );
}

export default Home;
