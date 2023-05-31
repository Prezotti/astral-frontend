import { useState } from "react";
import styles from "../styles/components/Input.module.css";

export interface InputProps {
  largura?: string;
  label?: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  largura = "250px",
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: largura }}
      />
    </div>
  );
}
