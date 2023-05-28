import { ItemCompra } from "@/classes/ItemCompra";
import styles from "../styles/components/ItemCarrinho.module.css";
import { useState } from "react";
import { Mensagem } from "./Mensagem";
import Modal from "./Modal";
import ModalConfirmacao from "./ModalConfirmacao";

interface ItemCarrinhoProps {
  item: ItemCompra;
  retorno: (item: ItemCompra) => void;
}

export default function ItemCarrinho({ item, retorno }: ItemCarrinhoProps) {
  const [quantidade, setQuantidade] = useState(item.quantidade);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const adicionarItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (quantidade < item.produto.qtdEstoque) {
      item.quantidade = quantidade + 1;
      setQuantidade(quantidade + 1);
      setMostrarMensagem(false);
      retorno(item);
    } else {
      setMostrarMensagem(true);
    }
  };

  const removerItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    item.quantidade = quantidade - 1;
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
      retorno(item);
    } else {
      setMostrarModal(true);
    }
  };

  const removerItemTotalmente = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    setMostrarModal(true);
  };

  return (
    <>
      <div className={styles.linhaProduto}>
        <p className={styles.descricaoProduto}>{item.produto.descricao}</p>
        <div className={styles.qtdProduto}>
          <div className={styles.botaoAddItem}>
            <button onClick={removerItem}>-</button>
            <p>{quantidade}</p>
            <button onClick={adicionarItem}>+</button>
          </div>
          <p className={styles.removerItem} onClick={removerItemTotalmente}>
            Remover
          </p>
        </div>
        <p className={styles.preco}>
          R$
          {(item.produto.preco * quantidade).toFixed(2).replace(".", ",")}
        </p>
      </div>
      {mostrarMensagem && (
        <Mensagem
          mensagem={`Este produto possui apenas ${item.produto.qtdEstoque} unidades em estoque!`}
          tipo="aviso"
        />
      )}
      <ModalConfirmacao
        aviso="Tem certeza que deseja remover este item?"
        onClickBotao={() => {
          item.quantidade = 0;
          setQuantidade(0);
          retorno(item);
        }}
        setConfirmacaoVisivel={setMostrarModal}
        visivel={mostrarModal}
      />
    </>
  );
}
