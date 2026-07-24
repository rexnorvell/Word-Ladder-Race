import { useState } from "react";
import Button from "../Button/Button";
import TextBlock from "../TextBlock/TextBlock";
import TextInput from "../TextInput/TextInput";
import "./Form.css";

interface Props {
  title: string;
  buttonText: string;
  onSubmit: (username: string, password: string) => void;
}

function Form({ title, buttonText, onSubmit }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
    <div className="FormContainer">
      <form className="FormContents" onSubmit={handleSubmit}>
        <div className="FormHeader">
          <TextBlock size={4}>{title}</TextBlock>
        </div>
        <div className="FormRow">
          <TextBlock size={6}>Username</TextBlock>
          <TextInput
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
        </div>
        <div className="FormRow">
          <TextBlock size={6}>Password</TextBlock>
          <TextInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="FormRow">
          <Button text={buttonText} color="secondary" />
        </div>
      </form>
    </div>
  );
}

export default Form;
