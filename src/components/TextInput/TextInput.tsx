import "./TextInput.css";

interface Props {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
}

function TextInput({ value, maxLength, onChange }: Props) {
  return (
    <input
      className="TextInput"
      placeholder="Enter word here"
      maxLength={maxLength}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextInput;
