import { forwardRef } from "react";
import "./GameTextInput.css";

interface Props {
  enabled?: boolean;
  onChange: (value: string) => void;
  value: string;
}

const GameTextInput = forwardRef<HTMLInputElement, Props>(
  ({ enabled = true, onChange, value }: Props, ref) => {
    return (
      <input
        ref={ref}
        className="GameTextInput"
        placeholder="Enter word here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!enabled}
      />
    );
  },
);

export default GameTextInput;
