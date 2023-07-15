import styles from "../styles/pages/Compras.module.css";

import { CardPedido } from "@/components/CardPedido";
import { Compra } from "@/classes/Compra";
import { ListagemProduto } from "@/classes/ListagemProduto";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Footer } from "@/components/Footer";

export default function Compras() {
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
          <div className={styles.totalPedidos}>
            <h2>Total de pedidos:</h2>
            <p>6 pedidos</p>
          </div>
          <div className={styles.totalVendas}>
            <h2>Total em vendas:</h2>
            <p>R$230,15</p>
          </div>
        </div>
      </section>
      <section className={styles.pedidos}>
        <h2 className={styles.tituloVendas}>Vendas</h2>
        <div className={styles.pesquisa}>
          <SearchBar
            placeholder="Pesquisar pedido ou comprador..."
            retornaBusca={(busca) => handleSearch(busca)}
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
