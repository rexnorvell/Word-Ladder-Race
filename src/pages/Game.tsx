import HeaderBar from "../components/HeaderBar/HeaderBar";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import TextBlock from "../components/TextBlock/TextBlock";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const done = wordData.length > 0 && wordData.every((entry) => entry.guessed);
  const elapsedTime =
    startTime !== null && endTime !== null ? endTime - startTime : null;

  useEffect(() => {
    setWordData(createWordData());
    setStartTime(Date.now());
  }, [wordListLength]);

  useEffect(() => {
    if (done && endTime === null) {
      setEndTime(Date.now());
    }
  }, [done, endTime]);

  function newGame() {
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
        <TextInput
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
        {done && elapsedTime && (
          <TextBlock
            text={`All done! Elapsed time: ${elapsedTime / 1000} seconds`}
          />
        )}
      </div>
    </div>
  );
}

export default Game;
