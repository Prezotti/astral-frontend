import { CardPedido } from "@/components/CardPedido";
import { Compra } from "@/classes/Compra";
import { ListagemProduto } from "@/classes/ListagemProduto";

export default function Compras() {
  return (
    <>
      <CardPedido
        compra={
          new Compra(
            1,
            new Date("2023-06-05"),
            "Vinicius Cole",
            "2798883227800",
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
          )
        }
      ></CardPedido>
      <CardPedido
        compra={
          new Compra(
            2,
            new Date("2023-06-05"),
            "Henrique",
            "2798883227800",
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
          )
        }
      ></CardPedido>
    </>
  );
}
