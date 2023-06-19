import { ListagemProduto } from "@/classes/ListagemProduto";
import styles from "../styles/components/TabelaCardPedido.module.css";

interface TabelaCardPedidoProps{
    vetItensCompra: ListagemProduto[];
}

export function TabelaCardPedido({vetItensCompra} : TabelaCardPedidoProps){
    return(
        <div className={styles.tabela}>
        <table>
          <thead>
          <th colSpan={2}>{vetItensCompra.map((item) => item.produtor)}</th>
            <tr>
              <th>ITEM</th>
              <th className={styles.thQuantidade}>QTD</th>
            </tr>
          </thead>
          <tbody>
        {vetItensCompra.map((item) => {
            return(
                <tr>
                <td>{item.produto}</td>
                <td>{item.quantidade}</td>
              </tr>
            )
        })}
          </tbody>
        </table>
      </div>
    )
}