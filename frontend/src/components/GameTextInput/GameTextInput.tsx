import { forwardRef } from "react";
import "./GameTextInput.css";

interface Props {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
}

const GameTextInput = forwardRef<HTMLInputElement, Props>(
  ({ value, maxLength, onChange }: Props, ref) => {
    return (
      <input
        ref={ref}
        className="GameTextInput"
        placeholder="Enter word here"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  },
);

export default GameTextInput;
