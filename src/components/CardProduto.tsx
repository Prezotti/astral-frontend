import styles from "../styles/components/CardProduto.module.css";
import { Button } from "./Button";

import { useState } from "react";
import { Mensagem } from "./Mensagem";
import { ItemCompra } from "@/classes/ItemCompra";
import { Produto } from "@/classes/Produto";

interface CardProdutoProps {
  produto: Produto;
  retornaItem: (item: ItemCompra) => void;
}

export function CardProduto({ produto, retornaItem }: CardProdutoProps) {
  const [quantidade, setQuantidade] = useState(0);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  const item = new ItemCompra(quantidade, produto);

  const mudarBotao = (event: React.MouseEvent<HTMLButtonElement>) => {
    const botaoAddItem = event.currentTarget.parentElement?.querySelector(
      `.${styles.botaoAddItem}`
    ) as HTMLDivElement;
    event.currentTarget.classList.add(styles.desabilitado);
    botaoAddItem.classList.add(styles.ativoDiv);
    botaoAddItem.classList.remove(styles.desabilitado);
    setQuantidade(1);
    item.quantidade = 1;
    retornaItem(item);
  };

  const adicionarItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (quantidade < produto.qtdEstoque) {
      item.quantidade = quantidade + 1;
      retornaItem(item);
      setQuantidade(quantidade + 1);
      setMostrarMensagem(false);
    } else {
      setMostrarMensagem(true);
    }
  };

  const removerItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    item.quantidade = quantidade - 1;
    retornaItem(item);
    if (quantidade > 1) setQuantidade(quantidade - 1);
    if (quantidade === 1) {
      const botaoAddItem =
        event.currentTarget.parentElement?.parentElement?.querySelector(
          `.${styles.botaoAddItem}`
        ) as HTMLDivElement;
      const botaoComprar = event.currentTarget.parentElement?.parentElement
        ?.children[1] as HTMLButtonElement;
      botaoAddItem.classList.add(styles.desabilitado);
      botaoAddItem.classList.remove(styles.ativoDiv);
      botaoComprar.classList.remove(styles.desabilitado);
      setQuantidade(0);
    }
  };

  return (
    <section className={styles.cardProduto}>
      <img src={produto.imagem} alt="Imagem do produto" />
      <div className={styles.conteudo}>
        <div className={styles.descricao}>
          <h3>{produto.descricao}</h3>
          <p>Produtor: {produto.produtor.nome}</p>
        </div>
        <div className={styles.infoComprar}>
          <section className={styles.texto}>
            <p>R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
            <p className={styles.medida}>{produto.medida}</p>
          </section>
          <Button
            text="COMPRAR"
            onClick={mudarBotao}
            classType="botaoProduto"
          />
          <div className={styles.botaoAddItem}>
            <button onClick={removerItem}>-</button>
            <p>{quantidade}</p>
            <button onClick={adicionarItem}>+</button>
          </div>
        </div>
      </div>
      {mostrarMensagem && (
        <Mensagem
          mensagem={`Este produto possui apenas ${produto.qtdEstoque} unidades em estoque!`}
          tipo="aviso"
        />
      )}
    </section>
  );
}
