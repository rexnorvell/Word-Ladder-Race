import type { ReactNode } from "react";
import "./Button.css";

interface Props {
  text?: string;
  icon?: ReactNode;
  color?: "primary" | "secondary";
  onClick?: () => void;
}

function Button({ text, icon, color = "primary", onClick = () => {} }: Props) {
  return (
    <button className={`Button Button--${color}`} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}

export default Button;
