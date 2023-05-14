import { IconType } from "react-icons/lib";
import styles from "../styles/components/Button.module.css";

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  text: string;
  icon?: IconType;
  loading?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classType: string;
}

export function Button({
  backgroundColor = "#FA8001",
  color = "#fff",
  text,
  classType,
  onClick,
  icon,
  loading = false,
}: ButtonProps) {
  let Icon: IconType = () => <></>;
  if (icon) Icon = icon;

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
      {icon && <Icon />}
      {loading && (
        <img
          src="/loading-animation.svg"
          alt="Carregando..."
          className={styles.iconeCarregamento}
        />
      )}
    </button>
  );
}
