import { useState } from "react";
import styles from "../styles/components/Input.module.css";

export interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
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
      />
    </div>
  );
}
