import styles from "../styles/pages/Home.module.css";

import { useState } from "react";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Categoria } from "@/components/Categoria";
import { Produto } from "@/components/Produto";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";

import { HiOutlineEmojiSad } from "react-icons/hi";

interface nomeInputProps {
  nome: string;
}

export function nomeInput(props: nomeInputProps) {
  const nome = props.nome;
  return nome;
}

console.log(nomeInput);

const produtos = [
  {
    imagem: "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    descricao: "Banana Prata",
    preco: 2.5,
    medida: "Kg",
    produtor: "Henrique",
    estoque: 10,
    categoria: "Frutas",
  },
  {
    imagem: "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    descricao: "Banana Prata",
    preco: 2.5,
    medida: "Kg",
    produtor: "Angélica e Vanildo",
    estoque: 15,
    categoria: "Legumes",
  },
  {
    imagem: "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    descricao: "Pão caseiro com goiabada chinesa",
    preco: 2.5,
    medida: "Kg",
    produtor: "Henrique",
    estoque: 10,
    categoria: "Verduras",
  },
  {
    imagem: "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    descricao: "Banana Prata",
    preco: 2.5,
    medida: "Kg",
    produtor: "Henrique",
    estoque: 10,
    categoria: "Frutas",
  },
  {
    imagem: "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    descricao: "Banana Prata",
    preco: 2.5,
    medida: "Kg",
    produtor: "Henrique",
    estoque: 10,
    categoria: "Embalados",
  },
  {
    imagem: "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    descricao: "Banana Prata",
    preco: 2.5,
    medida: "Dúzia",
    produtor: "Henrique",
    estoque: 10,
    categoria: "Doces",
  },
];

enum CategoriaEnum {
  FRUTAS = "Frutas",
  LEGUMES = "Legumes",
  VERDURAS = "Verduras",
  EMBALADOS = "Embalados",
  DOCES = "Doces",
  GRANJA = "Granja",
  OUTROS = "Outros",
}

interface CategoriaInterface {
  [key: string]: boolean;
}

export default function Home() {
  const [busca, setBusca] = useState("");

  const [categorias, setCategorias] = useState<CategoriaInterface>({
    [CategoriaEnum.FRUTAS]: false,
    [CategoriaEnum.LEGUMES]: false,
    [CategoriaEnum.VERDURAS]: false,
    [CategoriaEnum.EMBALADOS]: false,
    [CategoriaEnum.DOCES]: false,
    [CategoriaEnum.GRANJA]: false,
    [CategoriaEnum.OUTROS]: false,
  });

  let qtdProdutos = 0;

  function toggleCategoriaAtiva(categoria: CategoriaEnum): void {
    setCategorias((prevState) => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  }

  const categoriasAtivas = Object.entries(categorias)
    .filter(([_, ativa]) => ativa)
    .map(([categoria, _]) => categoria as string);

  const handleSearch = (busca: string) => {
    setBusca(busca);
    return <></>;
  };

  console.log(busca);

  return (
    <>
      <Header render={(busca) => handleSearch(busca)} />
      <div className={styles.banner}>
        <h1>Feira Astral</h1>
        <p>
          Nos dedicamos a entregar os melhores produtos orgânicos do município
          de Santa Teresa. Venha conhecer!
        </p>
        <a href="/sobre">
          <Button text="SOBRE NÓS" onClick={() => {}} classType="botaoBanner" />
        </a>
      </div>
      {/* <div className={styles.categoriaDiv}>
        <h2>Filtrar por categoria</h2>
        <section className={styles.categorias}>
          <Categoria
            imagem="/frutas.png"
            titulo="Frutas"
            categoriaAtiva={categorias[CategoriaEnum.FRUTAS]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.FRUTAS)}
          />
          <Categoria
            imagem="/legumes.png"
            titulo="Legumes"
            categoriaAtiva={categorias[CategoriaEnum.LEGUMES]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.LEGUMES)}
          />
          <Categoria
            imagem="/verduras.png"
            titulo="Verduras"
            categoriaAtiva={categorias[CategoriaEnum.VERDURAS]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.VERDURAS)}
          />
          <Categoria
            imagem="/embalados.png"
            titulo="Embalados"
            categoriaAtiva={categorias[CategoriaEnum.EMBALADOS]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.EMBALADOS)}
          />
          <Categoria
            imagem="/doces-e-frutas.png"
            titulo="Doces"
            categoriaAtiva={categorias[CategoriaEnum.DOCES]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.DOCES)}
          />
          <Categoria
            imagem="/granja-e-pescados.png"
            titulo="Granja e Pescados"
            categoriaAtiva={categorias[CategoriaEnum.GRANJA]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.GRANJA)}
          />
          <Categoria
            imagem="/outros.png"
            titulo="Outros"
            categoriaAtiva={categorias[CategoriaEnum.OUTROS]}
            onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.OUTROS)}
          />
        </section>
      </div>
      <div className={styles.produtosDiv}>
        <section className={styles.produtosSection}>
          <h2>Nossos Produtos</h2>
          <section className={styles.produtos}>
            {produtos.map((produto) => {
              if (
                (categoriasAtivas.length === 0 ||
                  categoriasAtivas.includes(produto.categoria)) &&
                (produto.descricao
                  .toLowerCase()
                  .includes(busca.toLowerCase()) ||
                  busca === "")
              ) {
                qtdProdutos++;
                return (
                  <Produto
                    imagem={produto.imagem}
                    descricao={produto.descricao}
                    preco={produto.preco}
                    medida={produto.medida}
                    produtor={produto.produtor}
                    qtdEstoque={produto.estoque}
                  />
                );
              }
            })}
          </section>
          {qtdProdutos === 0 && (
            <h3 className={styles.nenhumProdutoMsg}>
              Nenhum produto encontrado utilizando esses filtros
              <HiOutlineEmojiSad size={25} />
            </h3>
          )}
        </section>
      </div>
      <Footer /> */}
    </>
  );
}
