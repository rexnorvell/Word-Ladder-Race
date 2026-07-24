import type { ReactNode } from "react";
import "./Button.css";

interface Props {
  text?: string;
  shadow?: boolean;
  icon?: ReactNode;
  color?: "primary" | "secondary";
  onClick?: () => void;
}

function Button({
  text,
  shadow = true,
  icon,
  color = "primary",
  onClick = () => {},
}: Props) {
  return (
    <button
      className={`Button Button--${color} ${shadow ? "Button--shadow" : ""}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
