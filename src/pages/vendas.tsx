import styles from "../styles/pages/Vendas.module.css";

import { GetServerSidePropsContext } from "next";

import { CardPedido } from "@/components/CardPedido";
import { Compra } from "@/classes/Compra";
import { ListagemProduto } from "@/classes/ListagemProduto";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Footer } from "@/components/Footer";
import { Cargos, temCargo } from "@/service/tokenService";
import api from "@/api/api";
import { useEffect, useState } from "react";
import { Feira } from "@/types/Feira";
import Cookies from "js-cookie";
import { get } from "http";

export default function Compras() {

  const [idFeira, setIdFeira] = useState<number>(0);
  const [feiraRecente, setFeiraRecente] = useState<Feira|null>(null);

  const getIdRecente = async (): Promise<number> => {
    const token = Cookies.get("token");
    let id=0;
    await api.get("/feira/recente", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      id = response.data.id;
    }
    ).catch((error) => {
      console.log(error);
    });
    console.log(id);
    return id;
  }

  const getInformacoesFeiras = (id: number) => {
    const token = Cookies.get("token");
    api.get(`/compra/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setFeiraRecente(response.data);
      console.log(response.data);
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  } 

  useEffect(() => {
    let id=0;
    const wait = async () => {
      id = await getIdRecente();
      getInformacoesFeiras(id);
    }
    wait();
  }, []);

  const compras = [
    new Compra(
      1,
      new Date("2023-06-05"),
      "Vinicius Cole",
      "270",
      "Rua das Azaleias, 69 - casa",
      [
        new ListagemProduto("Cebolinha", "Vanildo", 4),
        new ListagemProduto("Banana Prata", "Durce", 4),
      ],
      "DINHEIRO",
      "ENTREGA",
      "",
      5,
      54
    ),
    new Compra(
      2,
      new Date("2023-06-05"),
      "Henrique",
      "27988832270",
      "Rua das Azaleias, 69 - casa",
      [
        new ListagemProduto("Cebolinha", "Durce", 4),
        new ListagemProduto("Banana Prata", "Durce", 4),
      ],
      "DINHEIRO",
      "ENTREGA",
      "",
      5,
      54
    ),
    // Adicione mais instâncias aqui com informações aleatórias
    // Exemplo:
    new Compra(
      3,
      new Date("2023-06-05"),
      "João",
      "27988832270",
      "Rua das Flores, 123",
      [
        new ListagemProduto("Maçã", "Durce", 3),
        new ListagemProduto("Laranja", "Vanildo", 5),
      ],
      "PIX",
      "IFES",
      "Loja A",
      6,
      87
    ),
    new Compra(
      4,
      new Date("2023-06-06"),
      "Maria",
      "27988832278",
      "Rua dos Cravos, 321",
      [
        new ListagemProduto("Tomate", "Durce", 2),
        new ListagemProduto("Cenoura", "Vanildo", 3),
      ],
      "DINHEIRO",
      "SANTA_TERESA",
      "",
      4,
      39
    ),
    new Compra(
      5,
      new Date("2023-06-06"),
      "Pedro",
      "27988832278",
      "Rua das Margaridas, 555",
      [
        new ListagemProduto("Abacaxi", "Durce", 1),
        new ListagemProduto("Melancia", "Durce", 2),
      ],
      "PICPAY",
      "ENTREGA",
      "Loja B",
      3,
      22
    ),
  ];

  const handleSearch = (busca: string): void => {
    console.log(busca);
  };

  return (
    <section className={styles.body}>
      <Header tipo="admin" />
      <h1 className={styles.tituloPagina}>Feira 4</h1>
      <section className={styles.resumo}>
        <div className={styles.divTitulo}>
          <h2 className={styles.titulo}>Resumo</h2>
          <div className={styles.detalheTitulo}></div>
        </div>
        <div className={styles.estatisticas}>
          <div>
            <h2>Pedidos:</h2>
            <p>6 pedidos</p>
          </div>
          <div>
            <h2>Vendas:</h2>
            <p>R$230,15</p>
          </div>
          <div>
            <h2>Doações:</h2>
            <p>$50,00</p>
          </div>
          <div>
            <h2>Entregas:</h2>
            <p>$50,00</p>
          </div>
        </div>
      </section>
      <section className={styles.pedidos}>
        <h2 className={styles.tituloVendas}>Vendas</h2>
        <div className={styles.pesquisa}>
          <SearchBar
            placeholder="Pesquisar pedido ou comprador..."
            retornaBusca={(busca) => handleSearch(busca)}
            backgroudColor="#fff"
          />
        </div>
        <div className={styles.cardsPedidos}>
          {compras.map((compra) => (
            <CardPedido compra={compra} key={compra.id} />
          ))}
        </div>
      </section>
      <div className={styles.paginas}>
        <button style={{ fontWeight: "bold" }}>&lt;</button>
        <button>1</button>
        <button>2</button>
        <button className={styles.active}>3</button>
        <button>4</button>
        <button>5</button>
        <button style={{ fontWeight: "bold" }}>&gt;</button>
      </div>
      <Footer />
    </section>
  );
}

export async function getServerSideProps(contexto: GetServerSidePropsContext) {
  if (
    contexto.req.cookies.token === undefined ||
    !temCargo(contexto.req.cookies.token, Cargos.ADMINISTRADOR)
  ) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
