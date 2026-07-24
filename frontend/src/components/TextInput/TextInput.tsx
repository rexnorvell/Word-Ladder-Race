import showIcon from "../../assets/images/show.svg";
import hideIcon from "../../assets/images/hide.svg";
import Button from "../Button/Button";
import "./TextInput.css";
import { useState } from "react";

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function TextInput({ placeholder, value, onChange, type = "text" }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="TextInputContainer">
      <input
        className={`TextInput ${type === "password" ? "TextInput--password" : ""}`}
        type={type === "password" && show ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></input>
      {type === "password" && (
        <Button
          color="transparent"
          shadow={false}
          type="button"
          icon={
            <img
              src={show ? showIcon : hideIcon}
              alt=""
              onClick={() => setShow(!show)}
            />
          }
        />
      )}
    </div>
  );
}

export default TextInput;
