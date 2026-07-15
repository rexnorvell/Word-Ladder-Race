import HeaderBar from "../components/HeaderBar/HeaderBar";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import loadWords from "../services/words";
import "./Game.css";

function Game() {
  const [words, setWords] = useState<Record<string, string>>({});
  useEffect(() => {
    setWords(loadWords);
  }, []);
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        {Object.entries(words).map(([word, definition]) => (
          <div className="GameRow" key={word}>
            <div className="WordCell" key={word}>
              {word}
            </div>
            <div className="DefinitionCell" key={definition}>
              {definition}
            </div>
          </div>
        ))}
        <TextInput />
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
