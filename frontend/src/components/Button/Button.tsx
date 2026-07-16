import "./Button.css";

interface Props {
  text: string;
  color?: "primary" | "secondary";
  onClick?: () => void;
}

function Button({ text, color = "primary", onClick = () => {} }: Props) {
  return (
    <button className={`Button Button--${color}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
