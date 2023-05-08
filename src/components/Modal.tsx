import { useState } from "react";

import styles from "../styles/components/Modal.module.css";

import { IoArrowBack } from "react-icons/io5";
import { Button } from "./Button";

interface ModalInterface {
  titulo: string;
  children: React.ReactNode;
  visivel: boolean;
  setVisivel: React.Dispatch<React.SetStateAction<boolean>>;
  textoBotao: string;
  onClickBotao: () => void;
}

export default function Modal({
  titulo,
  children,
  visivel,
  setVisivel,
  textoBotao,
  onClickBotao,
}: ModalInterface) {
  if (!visivel) return null;
  return (
    <div className={styles.modalBlur}>
      <div className={styles.modal}>
        <div className={styles.cabecalho}>
          <section
            onClick={() => setVisivel(false)}
            className={styles.voltarSection}
          >
            <IoArrowBack className={styles.iconeVoltar} />
            <p>Voltar</p>
          </section>
          <section className={styles.tituloSection}>
            <h1>{titulo}</h1>
            <div />
          </section>
        </div>
        <div className={styles.conteudo}>{children}</div>
        <Button
          text={textoBotao}
          onClick={onClickBotao}
          classType="botaoModal"
        />
      </div>
    </div>
  );
}
