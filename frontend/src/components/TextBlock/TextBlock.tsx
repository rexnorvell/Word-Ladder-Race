import type { ReactNode } from "react";
import "./TextBlock.css";

interface Props {
  className?: string;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  textAlign?: "center" | "left" | "right";
  fadeIn?: boolean;
}

function TextBlock({
  className,
  size,
  children,
  textAlign = "center",
  fadeIn = false,
}: Props) {
  return (
    <div
      className={`TextBlock ${className} ${fadeIn ? "TextBlock--fadeIn" : ""}`}
      style={{ textAlign: textAlign, fontSize: `${4 - size * 0.4}em` }}
    >
      {children}
    </div>
  );
}

export default TextBlock;
