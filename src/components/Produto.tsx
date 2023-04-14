import React, { useState } from 'react';
import styles from '../styles/components/Produto.module.css';
import { Button } from './Button';
import { Mensagem } from './Mensagem';

interface ProdutoProps {
  imagem: string;
  descricao: string;
  preco: number;
  medida: string;
  qtdEstoque: number;
  produtor: string;
}

export function Produto({
  imagem,
  descricao,
  preco,
  medida,
  qtdEstoque,
  produtor
}: ProdutoProps) {
  const [quantidade, setQuantidade] = useState(0);
  
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  const mudarBotao = (event: React.MouseEvent<HTMLButtonElement>) => {
    const botaoAddItem = event.currentTarget.parentElement?.querySelector(
      `.${styles.botaoAddItem}`
    ) as HTMLDivElement;

    event.currentTarget.classList.add(styles.desabilitado);
    botaoAddItem.classList.add(styles.ativoDiv);
    botaoAddItem.classList.remove(styles.desabilitado);
    setQuantidade(1);
  };

  const adicionarItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (quantidade < qtdEstoque) {
      setQuantidade(quantidade + 1);
      setMostrarMensagem(false);
    } else {
      setMostrarMensagem(true);
    }
  };

  
  const removerItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
    if (quantidade === 1) {
      const botaoAddItem = event.currentTarget.parentElement?.parentElement?.querySelector(
        `.${styles.botaoAddItem}`
      ) as HTMLDivElement;
      const botaoComprar = event.currentTarget.parentElement?.parentElement?.children[2] as HTMLButtonElement;
      botaoAddItem.classList.add(styles.desabilitado);
      botaoAddItem.classList.remove(styles.ativoDiv);
      botaoComprar.classList.remove(styles.desabilitado);
      setQuantidade(0);
    }
  };

  return (
    <section className={styles.cardProduto}>
      <img src={imagem} alt='Imagem do produto' />
      <div className={styles.conteudo}>
        <div className={styles.descricao}>
          <h3>{descricao}</h3>
          <p>Produtor: {produtor}</p>
        </div>
        <div className={styles.infoComprar}>
          <p>R$ {preco.toFixed(2).replace('.', ',')}</p>
          <p className={styles.medida}>{medida}</p>
          <Button height={30} width={100} text='COMPRAR' onClick={mudarBotao} />
          <div className={styles.botaoAddItem}>
            <button onClick={removerItem}>-</button>
            <p>{quantidade}</p>
            <button onClick={adicionarItem}>+</button>
          </div>
        </div>
      </div>
      {mostrarMensagem && (
        <Mensagem mensagem={`Este produto possui apenas ${qtdEstoque} unidades em estoque!`} tipo='erro' />
      )}
    </section>
  );
}