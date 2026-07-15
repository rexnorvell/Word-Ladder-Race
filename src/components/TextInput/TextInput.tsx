import { forwardRef } from "react";
import "./TextInput.css";

interface Props {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ value, maxLength, onChange }: Props, ref) => {
    return (
      <input
        ref={ref}
        className="TextInput"
        placeholder="Enter word here"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  },
);

export default TextInput;
