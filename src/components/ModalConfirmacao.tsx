import styles from "../styles/components/Confirmacao.module.css";

import { IoArrowBack } from "react-icons/io5";
import { Button } from "./Button";

interface ConfirmacaoIterface {
  aviso: string;
  mensagem?: string;
  visivel: boolean;
  setConfirmacaoVisivel: React.Dispatch<React.SetStateAction<boolean>>;
  onClickBotao: () => void;
  loadingBotao?: boolean;
}

export default function ModalConfirmacao({
  aviso,
  mensagem = "",
  visivel,
  setConfirmacaoVisivel,
  onClickBotao,
  loadingBotao = false,
}: ConfirmacaoIterface) {
  if (!visivel) return null;
  return (
    <div className={styles.modalConfirmacaoBlur}>
      <div className={styles.modalConfirmacao}>
        <section>
          <h2>Confirmação</h2>
          <div className={styles.divUnderline}></div>
        </section>
        <div className={styles.divTextos}>
          <h3>{aviso}</h3>
          <p>{mensagem}</p>
          <div className={styles.divBotoes}>
            <Button
              backgroundColor="#FA8001"
              text="CANCELAR"
              onClick={() => setConfirmacaoVisivel(false)}
              classType="botaoNegar"
            />
            <Button
              backgroundColor="#72B234"
              text="CONFIRMAR"
              onClick={onClickBotao}
              loading={loadingBotao}
              classType="botaoConfirmar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
