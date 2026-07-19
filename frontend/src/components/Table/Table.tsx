import type { LeaderboardEntry } from "../../types/LeaderboardEntry";
import { getTimeInSeconds, formatDate } from "../../utils/format";
import "./Table.css";

interface Props {
  title: string;
  entries: LeaderboardEntry[];
}

function Table({ title, entries }: Props) {
  return (
    <div className="TableContainer">
      <div className="TableHeader">
        <div className="TableCell">{title}</div>
      </div>
      <div className="TableHeader">
        <div className="TableCell">Rank</div>
        <div className="TableCell">Player</div>
        <div className="TableCell">Time (s)</div>
        <div className="TableCell">Date</div>
      </div>
      {entries.map((entry, index) => (
        <div className="TableRow" key={entry.id}>
          <div className="TableCell">{index + 1}</div>
          <div className="TableCell">{entry.player}</div>
          <div className="TableCell">{getTimeInSeconds(entry.time_ms)}</div>
          <div className="TableCell">{formatDate(entry.created_at)}</div>
        </div>
      ))}
    </div>
  );
}

export default Table;
