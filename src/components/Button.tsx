import { IconType } from "react-icons/lib";
import styles from "../styles/components/Button.module.css";

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  text: string;
  icon?: IconType;
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
      {icon && (
        <span>
          <Icon />
        </span>
      )}
    </button>
  );
}
