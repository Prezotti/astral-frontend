import styles from "../styles/components/Header.module.css";

import { SearchBar } from "./SearchBar";

import { TiShoppingCart } from "react-icons/ti";

export function Header() {
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

  const ativaFiltroProdutor = (
    evento: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    console.log(evento.currentTarget);
    evento.currentTarget.classList.toggle(styles.ativo);
    //todo: adicionar filtro
  };

  const produtores = ["Vanildo", "João", "Maria", "José", "ASdmiosajiod"];

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerConteudo}>
        <img src="/icone-astral.png" alt="Astral logo" />
        <a href="/">Início</a>
        <a href="/sobre">Sobre</a>
        <SearchBar />
        <section
          onMouseEnter={abrirMenuProdutores}
          onMouseLeave={fecharMenuProdutores}
          onTouchStart={abrirMenuProdutores}
          className={styles.selectProdutores}
        >
          <p>Produtores</p>
          <section className={styles.menuProdutores}>
            {produtores.map((produtor) => {
              return (
                <div
                  onClick={ativaFiltroProdutor}
                  onTouchStart={ativaFiltroProdutor}
                >
                  {produtor}
                </div>
              );
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
    </header>
  );
}
