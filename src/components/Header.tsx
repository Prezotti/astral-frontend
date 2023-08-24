import styles from "../styles/components/Header.module.css";

import api from "@/api/api";

import { SearchBar } from "./SearchBar";

import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface HeaderProps {
  retornaBusca?: (busca: string) => void;
  retornaProdutoresSelecionados?: (produtores: string[]) => void;
  tipo?: "cliente" | "produtor" | "admin";
  valorCarrinho?: number;
}

interface ProdutorInterface {
  nome: string;
  id: number;
}

interface ProdutorInterface {
  nome: string;
  id: number;
}

export function Header({
  retornaBusca,
  retornaProdutoresSelecionados,
  tipo = "cliente",
  valorCarrinho,
}: HeaderProps) {
  const [produtoresAtivos, setProdutoresAtivos] = useState<string[]>([]);
  const [produtores, setProdutores] = useState<ProdutorInterface[]>([]);
  const [idFeiraRecente, setIdFeiraRecente] = useState<number>(0);

  const getProdutores = async () => {
    try {
      const response = await api.get("/produtor");
      setProdutores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getIdRecente = async (): Promise<number> => {
    const token = Cookies.get("token");
    let id = 0;
    await api
      .get("/feira/recente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        id = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    return id;
  };

  useEffect(() => {
    getProdutores();
    if (tipo == "admin" || tipo == "produtor") {
      let idRecente = 0;
      const wait = async () => {
        idRecente = await getIdRecente();
      };
      wait().then(() => {
        setIdFeiraRecente(idRecente);
      });
    }
  }, []);

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

  const ativaFiltroProdutor = (evento: React.MouseEvent<HTMLDivElement>) => {
    const nomeProdutorClicado = evento.currentTarget.textContent ?? "";

    evento.currentTarget.classList.toggle(styles.ativo);

    if (produtoresAtivos.includes(nomeProdutorClicado)) {
      // Nome já está presente no vetor, então remove
      if (retornaProdutoresSelecionados)
        retornaProdutoresSelecionados(
          produtoresAtivos.filter(
            (produtor) => produtor !== nomeProdutorClicado
          )
        );
      setProdutoresAtivos(
        produtoresAtivos.filter((produtor) => produtor !== nomeProdutorClicado)
      );
    } else {
      // Nome não está presente no vetor, então adiciona
      if (retornaProdutoresSelecionados)
        retornaProdutoresSelecionados([
          ...produtoresAtivos,
          nomeProdutorClicado,
        ]);
      setProdutoresAtivos([...produtoresAtivos, nomeProdutorClicado]);
    }
  };
  const handleSearch = (busca: string) => {
    if (retornaBusca) return retornaBusca(busca);
  };
  if (tipo === "produtor")
    return (
      <header className={styles.headerContainer}>
        <div className={styles.headerConteudo}>
          <a href="/">
            <img src="/icone-astral.png" alt="Astral logo" />
          </a>
          <a href="/">Início</a>
          <a href="/produtos">Produtos</a>
          <a href={`/minhas-vendas/${idFeiraRecente}`}>Vendas</a>
          <CgProfile className={styles.fotoProdutor} />
        </div>
      </header>
    );
  else if (tipo === "admin")
    return (
      <header className={styles.headerContainer}>
        <div
          className={styles.headerConteudo}
          style={{ justifyContent: "space-evenly" }}
        >
          <a href="/">
            <img src="/icone-astral.png" alt="Astral logo" />
          </a>
          <a href="/admin">Início</a>
          <a href={`/vendas/${idFeiraRecente}`}>Vendas</a>
        </div>
      </header>
    );
  else
    return (
      <header className={styles.headerContainer}>
        <div className={styles.headerConteudo}>
          <a href="/">
            <img src="/icone-astral.png" alt="Astral logo" />
          </a>
          <a href="/">Início</a>
          <a href="/sobre">Sobre</a>
          <SearchBar retornaBusca={(busca) => handleSearch(busca)} />
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
                  <div onClick={ativaFiltroProdutor} key={produtor.id}>
                    {produtor.nome}
                  </div>
                );
              })}
            </section>
          </section>
          <div className={styles.divCarrinho}>
            <a href="/carrinho">
              <TiShoppingCart
                size={24}
                color="#000"
                className={styles.iconeCarrinho}
              />
              <p className={styles.precoCarrinho}>
                <span>R$</span> {valorCarrinho?.toFixed(2).replace(".", ",")}
              </p>
            </a>
          </div>
        </div>
      </header>
    );
}
