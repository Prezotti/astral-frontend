import { InputProps } from "./Input";

import { AiFillFileImage, AiFillFilePdf } from "react-icons/ai";

import styles from "../styles/components/EscolherArquivoInput.module.css";

interface EscolherArquivoInputProps
  extends Omit<InputProps, "type" | "placeholder"> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  tipoArquivo?: string;
}

export default function EscolherArquivoInput({
  label,
  tipoArquivo = "img",
  accept = "image/*",
  onChange,
  ...rest
}: EscolherArquivoInputProps) {
  let icone = <AiFillFileImage className={styles.icone} />;
  if (tipoArquivo === "pdf") {
    icone = <AiFillFilePdf className={styles.icone} />;
  }

  return (
    <div className={styles.inputDiv}>
      <input type="file" id={label} {...rest} accept={accept} onChange={onChange} />
      <label htmlFor={label}>
        {label}
        {icone}
      </label>
    </div>
  );
}
