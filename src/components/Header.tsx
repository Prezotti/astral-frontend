import styles from "../styles/components/Header.module.css";

import { SearchBar } from "./SearchBar";

import { TiShoppingCart } from "react-icons/ti";

import { useState } from "react";

export function Header({
  render,
  filtroProdutores,
}: {
  render: (busca: string) => JSX.Element;
  filtroProdutores: (produtores: string[]) => JSX.Element;
}) {
  const abrirMenuProdutores = () => {
    const menuProdutores = document.querySelector(
      `.${styles.menuProdutores}`
    ) as HTMLDivElement;
    menuProdutores.style.display = "flex";
    menuProdutores.classList.add(styles.slideintop);
  };

  const fecharMenuProdutores = () => {
    const menuProdutores = document.querySelector(
      `.${styles.menuProdutores}`
    ) as HTMLDivElement;
    menuProdutores.style.display = "none";
  };

  const [produtoresAtivos, setProdutoresAtivos] = useState<string[]>([]);

  const ativaFiltroProdutor = (evento: React.MouseEvent<HTMLDivElement>) => {
    const nomeProdutorClicado = evento.currentTarget.textContent ?? "";

    evento.currentTarget.classList.toggle(styles.ativo);

    if (produtoresAtivos.includes(nomeProdutorClicado)) {
      // Nome já está presente no vetor, então remove
      setProdutoresAtivos(
        produtoresAtivos.filter((produtor) => produtor !== nomeProdutorClicado)
      );
    } else {
      // Nome não está presente no vetor, então adiciona
      setProdutoresAtivos([...produtoresAtivos, nomeProdutorClicado]);
    }
  };

  const produtores = ["Vanildo", "João", "Maria", "José", "Henrique"];

  const handleSearch = (busca: string) => {
    return render(busca);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerConteudo}>
        <img src="/icone-astral.png" alt="Astral logo" />
        <a href="/">Início</a>
        <a href="/sobre">Sobre</a>
        <SearchBar render={(busca) => handleSearch(busca)} />
        <section
          onMouseEnter={abrirMenuProdutores}
          onMouseLeave={fecharMenuProdutores}
          onTouchStart={abrirMenuProdutores}
          className={styles.selectProdutores}
        >
          <p>Produtores</p>
          <section className={styles.menuProdutores}>
            {produtores.map((produtor) => {
              return <div onClick={ativaFiltroProdutor}>{produtor}</div>;
            })}
          </section>
        </section>
        <a href="/carrinho">
          <TiShoppingCart size={24} color="#000" />
          <p className={styles.precoCarrinho}>
            <span>R$</span> 99,99
          </p>
        </a>
      </div>
      {filtroProdutores(produtoresAtivos)}
    </header>
  );
}
