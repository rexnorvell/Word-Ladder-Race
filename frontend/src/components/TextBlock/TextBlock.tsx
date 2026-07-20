import "./TextBlock.css";

interface Props {
  className?: string;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

function TextBlock({ className, size, text }: Props) {
  return (
    <div className={`TextBlock TextBlock--${size} ${className}`}>{text}</div>
  );
}

export default TextBlock;
