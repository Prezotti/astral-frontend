import { CardPedido } from "@/components/CardPedido";
import { Compra } from "@/classes/Compra";
import { ListagemProduto } from "@/classes/ListagemProduto";

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

  return (
    <>
      {compras.map((compra) => (
        <CardPedido compra={compra} key={compra.id} />
      ))}
    </>
  );
}
