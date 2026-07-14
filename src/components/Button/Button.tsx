import "./Button.css";

interface Props {
  text: string;
  color?: "primary" | "secondary";
}

function Button({ text, color = "primary" }: Props) {
  return <button className={`Button Button--${color}`}>{text}</button>;
}

export default Button;
