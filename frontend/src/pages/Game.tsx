import HeaderBar from "../components/HeaderBar/HeaderBar";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import TextBlock from "../components/TextBlock/TextBlock";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import type { CreateLeaderboardEntryRequest } from "../types/CreateLeaderboardEntryRequest";
import { submitLeaderboardEntry } from "../services/api";
import loadWords from "../services/words";
import "./Game.css";

interface Props {
  wordListLength?: number;
}

interface WordEntry {
  word: string;
  definition: string;
  guessed: boolean;
}

function Game({ wordListLength = 10 }: Props) {
  const [wordData, setWordData] = useState<WordEntry[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const navigate: NavigateFunction = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const done: boolean =
    wordData.length > 0 && wordData.every((entry) => entry.guessed);
  const elapsedTime =
    startTime !== null && endTime !== null ? endTime - startTime : null;

  useEffect(() => {
    inputRef.current?.focus();
    setWordData(createWordData());
    setStartTime(Date.now());
  }, [wordListLength]);

  useEffect(() => {
    if (done && endTime === null && startTime !== null) {
      const end = Date.now();
      setEndTime(end);
      submit({
        player: "Rex",
        time_ms: end - startTime,
      });
    }
  }, [done, endTime, elapsedTime]);

  async function submit(entry: CreateLeaderboardEntryRequest) {
    try {
      await submitLeaderboardEntry(entry);
    } catch (err) {
      console.error(err);
    }
  }

  function newGame() {
    inputRef.current?.focus();
    setWordData(createWordData());
    setGuess("");
    setEndTime(null);
    setStartTime(Date.now());
  }

  function createWordData(): WordEntry[] {
    const wordLadder: Record<string, string> = loadWords(wordListLength);
    return Object.entries(wordLadder).map(([word, definition]) => ({
      word,
      definition,
      guessed: false,
    }));
  }

  function checkGuess(guess: string) {
    setWordData((currentWords) =>
      currentWords.map((entry) =>
        entry.word.toLowerCase() === guess.toLowerCase()
          ? { ...entry, guessed: true }
          : entry,
      ),
    );
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <div className="WordGrid">
          {wordData.map(({ word, definition, guessed }) => (
            <div className="GameRow" key={word}>
              <div
                className={`WordCell WordCell--${guessed ? "guessed" : "not-guessed"}`}
              >
                {guessed ? word : "?"}
              </div>
              <div className="DefinitionCell">{definition}</div>
            </div>
          ))}
        </div>
        {done && elapsedTime ? (
          <TextBlock
            text={`All done! Elapsed time: ${elapsedTime / 1000} seconds`}
          />
        ) : (
          <TextInput
            ref={inputRef}
            value={guess}
            maxLength={4}
            onChange={(value) => {
              if (value.length === 4) {
                checkGuess(value);
                setGuess("");
              } else {
                setGuess(value);
              }
            }}
          />
        )}
        <Button
          text="New Game"
          color="primary"
          onClick={() => {
            newGame();
          }}
        />
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
