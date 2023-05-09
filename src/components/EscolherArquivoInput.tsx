import { InputProps } from "./Input";

import styles from "../styles/components/EscolherArquivoInput.module.css";

interface EscolherArquivoInputProps
  extends Omit<InputProps, "type" | "onChange" | "placeholder"> {}

export default function EscolherArquivoInput({
  label,
  ...rest
}: EscolherArquivoInputProps) {
  return (
    <div className={styles.inputDiv}>
      <label htmlFor={label}>{label}</label>
      <input type="file" id={label} {...rest} />
    </div>
  );
}
