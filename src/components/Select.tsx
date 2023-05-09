import styles from "../styles/components/Select.module.css";

import { InputProps } from "./Input";

interface SelectProps
  extends Omit<InputProps, "type" | "onChange" | "placeholder"> {
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  value,
  onChange,
  children,
}: SelectProps) {
  return (
    <div className={styles.selectDiv}>
      <label htmlFor={label}>{label}</label>
      <select id={label} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}
