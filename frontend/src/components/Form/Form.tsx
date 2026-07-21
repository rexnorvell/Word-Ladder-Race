import { useState } from "react";
import Button from "../Button/Button";
import TextBlock from "../TextBlock/TextBlock";
import TextInput from "../TextInput/TextInput";
import "./Form.css";

interface Props {
  title: string;
  onSubmit: (username: string, password: string) => void;
}

function Form({ title, onSubmit }: Props) {
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
          <TextBlock text={title} size={4} />
        </div>
        <div className="FormRow">
          <TextBlock text="Username" size={6} />
          <TextInput
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
        </div>
        <div className="FormRow">
          <TextBlock text="Password" size={6} />
          <TextInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="FormRow">
          <Button text="Log In" color="secondary" />
        </div>
      </form>
    </div>
  );
}

export default Form;
