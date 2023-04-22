import styles from "../styles/components/Button.module.css";

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classType: string;
}

export function Button({
  backgroundColor = "#FA8001",
  color = "#fff",
  text,
  classType,
  onClick,
}: ButtonProps) {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        color,
      }}
      className={`${styles.button} ${styles[classType]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
