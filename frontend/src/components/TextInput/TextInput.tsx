import "./TextInput.css";

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function TextInput({ placeholder, value, onChange, type = "text" }: Props) {
  return (
    <input
      className="TextInput"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextInput;
