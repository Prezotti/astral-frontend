import styles from "../../styles/pages/entregas.module.css";

import { Compra } from "@/classes/Compra";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { Cargos, temCargo } from "@/service/tokenService";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/api/api";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

export default function Entregas() {
  const [id, setId] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    setId(Number(id));
    if (id) {
      getInformacoesCompras(Number(id));
    }
  }, []);

  const [compras, setCompras] = useState<Compra[]>([]);

  const getInformacoesCompras = (idFeira: number) => {
    const token = Cookies.get("token");
    api
      .get(`/compra/entregas/${idFeira}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompras(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        router.push("/admin");
        //console.log(error);
      });
  };

  return (
    <>
      <Header tipo="admin" />
      <section className={styles.listagemEntregas}>
        <h1>Listagem das Entregas | Feira {id}</h1>
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
              {compras.map((compra) => {
                return (
                  <tr>
                    <td>{compra.cliente}</td>
                    <td>{compra.telefone}</td>
                    <td>{compra.endereco}</td>
                    <td>{compra.formaPagamento}</td>
                    <td>{compra.valorTotal.toFixed(2).replace(".", ",")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps(contexto: GetServerSidePropsContext) {
  const token = contexto.req.cookies.token;
  if (token === undefined || !temCargo(token, Cargos.ADMINISTRADOR)) {
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
