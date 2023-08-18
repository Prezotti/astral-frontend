import styles from "../styles/components/DetalhamentoPedido.module.css";

import { IoArrowBack } from "react-icons/io5";
import { BsCoin, BsTruck } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { Compra } from "@/classes/Compra";

interface DetalhamentoPedidoProps {
  titulo: string;
  compra: Compra;
  setVisivel: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin?: boolean;
}

export default function DetalhamentoPedido({
  titulo,
  compra,
  setVisivel,
  isAdmin = false,
}: DetalhamentoPedidoProps) {
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
        <div className={styles.conteudo}>
          <section className={styles.header}>
            <div className={styles.pedido}>
              <h3>Pedido #{compra.id}</h3>
              <p>Comprador: {compra.cliente}</p>
              <p>Telefone: {compra.telefone}</p>
              <section className={styles.infoEntrega}>
                <span>
                  <BsCoin className={styles.icone} />
                  {compra.formaPagamento}
                </span>
                <span>
                  <BsTruck className={styles.icone} />
                  {compra.opcaoRecebimento}
                </span>
              </section>
            </div>
            <div className={styles.icones}>
              {isAdmin && compra.doacao > 0 && (
                <span>
                  <RiCoinsLine className={styles.icone} />
                  Doação: R${compra.doacao.toFixed(2).replace(".", ",")}
                </span>
              )}
              {isAdmin && compra.taxaEntrega > 0 && (
                <span>
                  <RiCoinsLine className={styles.icone} />
                  Entrega: R${compra.taxaEntrega.toFixed(2).replace(".", ",")}
                </span>
              )}
              <span>
                <RiCoinsLine className={styles.icone} />
                Total: R${compra.valorTotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </section>
          <section className={styles.contentBody}>
            {isAdmin && compra.endereco != "" && (
              <p>
                <strong>Endereço:</strong> {compra.endereco}
              </p>
            )}
            {compra.observacoes != "" && (
              <p>
                <strong>Observações do cliente:</strong> {compra.observacoes}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
