import styles from "../styles/components/CardPedido.module.css";
import { BsCoin } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { BsExclamation } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { TabelaCardPedido } from "./TabelaCardPedido";
import { Compra } from "@/classes/Compra";
import { ListagemProduto } from "@/classes/ListagemProduto";
import { Button } from "./Button";

interface CardPedidoProps {
  compra: Compra;
}

export function CardPedido({ compra }: CardPedidoProps) {
  const [expandeContainer, setExpandeContainer] = useState(false);

  const handleExpandeContainer = () => {
    setExpandeContainer(!expandeContainer);
  };

  const produtores: string[] = [];
  compra.itens.forEach((item) => {
    if (!produtores.includes(item.produtor)) {
      produtores.push(item.produtor);
    }
  });

  function formatarListaProdutos(produtor: string): ListagemProduto[] {
    return compra.itens.filter((item) => item.produtor === produtor);
  }

  return (
    <>
      <div
        className={`${styles.cardPedido} ${
          expandeContainer ? styles.expandeContainer : ""
        }`}
      >
        <div className={styles.infoPedido}>
          <div className={styles.pedido}>
            <a href="">
              <BsExclamation className={styles.iconeExclamacao} />
            </a>
            <h3>Pedido #{compra.id}</h3>
          </div>
          <div className={styles.icones}>
            <span>
              <BsCoin className={styles.icone} />
              {compra.formaPagamento}
            </span>
            <span>
              <BsTruck className={styles.icone} />
              {compra.localEntrega}
            </span>
            <span>
              <RiCoinsLine className={styles.icone} />
              Valor: R${compra.valorTotal}
            </span>
          </div>
          <div className={styles.dadosComprador}>
            <p>Comprador: {compra.cliente}</p>
            <p>Telefone: {compra.telefone}</p>
          </div>
        </div>
        {expandeContainer && (
          <section className={styles.tabelas}>
            {produtores.map((produtor) => {
              return (
                <TabelaCardPedido
                  key={produtor}
                  vetItensCompra={formatarListaProdutos(produtor)}
                />
              );
            })}
          </section>
        )}
        <div className={styles.verMais} onClick={handleExpandeContainer}>
          <p>{expandeContainer ? "Ver Menos" : "Ver Mais"}</p>
          {expandeContainer ? (
            <MdKeyboardArrowUp className={styles.iconeSeta} />
          ) : (
            <MdKeyboardArrowDown className={styles.iconeSeta} />
          )}
        </div>
      </div>
    </>
  );
}
