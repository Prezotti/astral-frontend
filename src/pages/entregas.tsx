import styles from "../styles/pages/entregas.module.css";

import { Compra } from "@/classes/Compra";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { useState } from "react";
import Cookies from "js-cookie";
import api from "@/api/api";

export default function Entregas() {
  const [compras, setCompras] = useState<Compra[]>([]);

  const getInformacoesCompras = (idFeira: number) => {
    const token = Cookies.get("token");
    api
      .get(`/compra/${idFeira}/entregas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompras(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  return (
    <>
      <Header tipo="admin" />
      <section className={styles.listagemEntregas}>
        <h1>Listagem das Entregas | Feira 1</h1>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th className={styles.nome}>NOME CLIENTE</th>
                <th className={styles.telefone}>TELEFONE</th>
                <th className={styles.endereco}>ENDEREÇO</th>
                <th className={styles.formaPagamento}>FORMA PAGAMENTO</th>
                <th className={styles.valorTotal}>VALOR TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Henrique Prezotti</td>
                <td>27 9994589410</td>
                <td>
                  Rua das azaleias, 69 - Jardim da Montanha - Ao lado da Estação
                  de tratamento da CESAN
                </td>
                <td>PIX</td>
                <td>R$50,00</td>
              </tr>
              <tr>
                <td>Mayara Zanetti Carlini</td>
                <td>27 9994578920</td>
                <td>São Roque do Canaã</td>
                <td>Cartão</td>
                <td>R$300,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
}
