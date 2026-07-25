import { useState } from "react";
import Button from "../Button/Button";
import TextBlock from "../TextBlock/TextBlock";
import TextInput from "../TextInput/TextInput";
import "./AuthForm.css";

interface Props {
  title: string;
  buttonText: string;
  usernamePlaceholder: string;
  firstPasswordPlaceholder: string;
  secondPasswordPlaceholder?: string;
  onSubmit: (
    username: string,
    firstPassword: string,
    secondPassword?: string,
  ) => void;
}

function AuthForm({
  title,
  buttonText,
  usernamePlaceholder,
  firstPasswordPlaceholder,
  secondPasswordPlaceholder,
  onSubmit,
}: Props) {
  const [username, setUsername] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(username, firstPassword, secondPassword);
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
            placeholder={usernamePlaceholder}
            value={username}
            onChange={setUsername}
          />
        </div>
        <div className="FormRow">
          <TextBlock size={6}>Password</TextBlock>
          <TextInput
            placeholder={firstPasswordPlaceholder}
            type="password"
            value={firstPassword}
            onChange={setFirstPassword}
          />
        </div>
        {secondPasswordPlaceholder && (
          <div className="FormRow">
            <TextBlock size={6}>Confirm Password</TextBlock>
            <TextInput
              placeholder={secondPasswordPlaceholder}
              type="password"
              value={secondPassword}
              onChange={setSecondPassword}
            />
          </div>
        )}
        <div className="FormRow">
          <Button text={buttonText} color="secondary" />
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
