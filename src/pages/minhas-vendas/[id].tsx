import styles from "../../styles/pages/Minhas-vendas.module.css";

import { GetServerSidePropsContext } from "next";

import { CardPedido } from "@/components/CardPedido";
import { Compra } from "@/classes/Compra";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Footer } from "@/components/Footer";
import { Cargos, getId, temCargo } from "@/service/tokenService";
import api from "@/api/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Feira } from "@/types/Feira";
import { useRouter } from "next/router";

export default function Compras() {
  const [idFeiraAberta, setIdFeiraAberta] = useState<number>(0);
  const [idFeira, setIdFeira] = useState<number>(0);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [feira, setFeira] = useState<Feira>();
  const [pesquisa, setPesquisa] = useState<string>("");

  const router = useRouter();

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

  const getInformacoesFeira = (idProdutor: number, id: number) => {
    const token = Cookies.get("token");
    api
      .get(`/feira/${idProdutor}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFeira(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInformacoesCompras = (idProdutor: number, id: number) => {
    const token = Cookies.get("token");
    api
      .get(`/compra/${idProdutor}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompras(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.push("/login");
    else {
      const idProdutor = getId(token);
      const { id } = router.query;
      let idRecente = 0;
      const wait = async () => {
        idRecente = await getIdRecente();
        setIdFeiraAberta(idRecente);
        if (id) {
          setIdFeira(Number(id));
          getInformacoesCompras(idProdutor, Number(id));
          getInformacoesFeira(idProdutor, Number(id));
        }
      };
      wait();
    }
  }, [router.query]);

  const handleSearch = (busca: string): void => {
    setPesquisa(busca);
  };

  const changeFeira = (id: number) => {
    router.push(`/minhas-vendas/${id}`);
  };

  return (
    <section className={styles.body}>
      <Header tipo="produtor" />
      <h1 className={styles.tituloPagina}>Feira {idFeira}</h1>
      <section className={styles.resumo}>
        <div className={styles.divTitulo}>
          <h2 className={styles.titulo}>Resumo</h2>
          <div className={styles.detalheTitulo}></div>
        </div>
        <div className={styles.estatisticas}>
          <div>
            <h2>Pedidos:</h2>
            <p>
              {compras?.length !== 1
                ? compras.length + " pedidos"
                : compras.length + " pedido"}
            </p>
          </div>
          <div>
            <h2>Vendas:</h2>
            <p>
              R$
              {feira ? feira.valorTotal.toFixed(2).replace(".", ",") : "0,00"}
            </p>
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
          {compras.map((compra) => {
            if (pesquisa === "") {
              return <CardPedido compra={compra} key={compra.id} />;
            } else {
              if (
                compra.id.toString().includes(pesquisa) ||
                compra.cliente.toLowerCase().includes(pesquisa.toLowerCase())
              ) {
                return <CardPedido compra={compra} key={compra.id} />;
              }
            }
          })}
        </div>
      </section>
      <div className={styles.paginas}>
        <button
          style={{ fontWeight: "bold" }}
          onClick={() => {
            if (idFeira + 1 <= idFeiraAberta) changeFeira(idFeira + 1);
          }}
        >
          &lt;
        </button>
        <button className={styles.active}>{idFeira}</button>
        <button
          style={{ fontWeight: "bold" }}
          onClick={() => {
            if (idFeira - 1 > 0) changeFeira(idFeira - 1);
          }}
        >
          &gt;
        </button>
      </div>
      <Footer />
    </section>
  );
}

export async function getServerSideProps(contexto: GetServerSidePropsContext) {
  if (
    contexto.req.cookies.token === undefined ||
    !temCargo(contexto.req.cookies.token, Cargos.PRODUTOR)
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
