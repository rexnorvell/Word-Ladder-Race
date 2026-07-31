import HeaderBar from "../components/HeaderBar/HeaderBar";
import Button from "../components/Button/Button";
import GameTextInput from "../components/GameTextInput/GameTextInput";
import TextBlock from "../components/TextBlock/TextBlock";
import PopUp from "../components/PopUp/PopUp";
import { useEffect, useState, useRef } from "react";
import type { CreateLeaderboardEntryRequest } from "../types/CreateLeaderboardEntryRequest";
import { submitLeaderboardEntry } from "../services/api";
import loadWords from "../services/words";
import "./Game.css";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  wordListLength?: number;
}

interface WordEntry {
  word: string;
  definition: string;
  guessed: boolean;
  incorrect: boolean;
}

function Game({ wordListLength = 10 }: Props) {
  const authContext = useAuth();

  const [transitionBlocker, setTransitionBlocker] = useState(false);
  const [wordData, setWordData] = useState<WordEntry[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setWordData(createWordData());
    setStartTime(Date.now());
  }, [wordListLength]);

  useEffect(() => {
    if (wordData.every((entry) => entry.guessed)) {
      endGame();
    }
  }, [wordData]);

  useEffect(() => {
    if (!popupMessage) {
      inputRef.current?.focus();
    }
  }, [popupMessage]);

  async function submitTime(entry: CreateLeaderboardEntryRequest) {
    try {
      await submitLeaderboardEntry(entry);
    } catch (err) {
      console.error(err);
    }
  }

  function newGame() {
    setPopupMessage(null);
    setTransitionBlocker((prev) => !prev);
    setWordData(createWordData());
    setGuess("");
    setStartTime(Date.now());
  }

  function endGame(forfeited: boolean = false) {
    if (forfeited) {
      setWordData((currentWords) =>
        currentWords.map((entry) =>
          !entry.guessed ? { ...entry, incorrect: true } : entry,
        ),
      );
      const numCorrect = wordData.filter(
        (entry) => entry.guessed == true,
      ).length;
      setPopupMessage(
        `Game over! You got ${numCorrect}/${wordListLength} correct.`,
      );
    } else {
      const end = Date.now();
      if (!startTime) {
        return;
      }
      const totalTime = end - startTime;
      if (authContext.user) {
        submitTime({
          time_ms: totalTime,
        });
      }
      setPopupMessage(
        `Good job${authContext.user ? `, ${authContext.user}` : ""}! Elapsed time: ${totalTime / 1000} seconds.`,
      );
    }
  }

  function createWordData(): WordEntry[] {
    const wordLadder: Record<string, string> = loadWords(wordListLength);
    return Object.entries(wordLadder).map(([word, definition]) => ({
      word,
      definition,
      guessed: false,
      incorrect: false,
    }));
  }

  function checkGuess(guess: string): boolean {
    const normalizedGuess: string = guess.toLowerCase();

    const isCorrect: boolean = wordData.some(
      (entry) =>
        entry.word.toLowerCase() === normalizedGuess && entry.guessed === false,
    );

    if (isCorrect) {
      setWordData((currentWords) =>
        currentWords.map((entry) =>
          entry.word.toLowerCase() === guess.toLowerCase()
            ? { ...entry, guessed: true }
            : entry,
        ),
      );
    }

    return isCorrect;
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <GameTextInput
          ref={inputRef}
          enabled={!popupMessage}
          onChange={(value) => {
            if (value.length === 4) {
              const isCorrect: boolean = checkGuess(value);
              if (isCorrect) {
                setGuess("");
              } else {
                setGuess(value);
              }
            } else {
              setGuess(value);
            }
          }}
          value={guess}
        />
        <div className="ControlRow">
          <Button
            text="New Game"
            color="primary"
            onClick={() => {
              newGame();
            }}
          />
          {!popupMessage && (
            <Button
              text="Give Up"
              color="secondary"
              onClick={() => {
                endGame(true);
              }}
            />
          )}
        </div>
        {wordData.length > 0 && (
          <div className="WordGrid">
            {wordData.map(({ word, definition, guessed, incorrect }) => (
              <div className="GameRow" key={`${transitionBlocker}-${word}`}>
                <div
                  className={`WordCell WordCell--${guessed ? "guessed" : "not-guessed"} ${incorrect ? "WordCell--incorrect" : ""}`}
                >
                  {guessed || incorrect ? word : "?"}
                </div>
                <div className="DefinitionCell">{definition}</div>
              </div>
            ))}
            {popupMessage && (
              <PopUp>
                <div className="PopUpRow">
                  <TextBlock size={5}>{popupMessage}</TextBlock>
                </div>
              </PopUp>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
