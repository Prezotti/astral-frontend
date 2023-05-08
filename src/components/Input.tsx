import { useState } from "react";
import styles from "../styles/components/Input.module.css";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
}

export default function Input({ label, type, placeholder, value }: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={label}>{label}</label>
      <input id={label} type={type} placeholder={placeholder} value={value} />
    </div>
  );
}
