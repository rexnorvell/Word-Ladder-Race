import type { ReactNode } from "react";
import "./TextBlock.css";

interface Props {
  className?: string;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

function TextBlock({ className, size, children }: Props) {
  return (
    <div className={`TextBlock TextBlock--${size} ${className}`}>
      {children}
    </div>
  );
}

export default TextBlock;
