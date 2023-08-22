import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import { Button } from "@/components/Button";
import styles from "../styles/pages/Admin.module.css";
import { Header } from "@/components/Header";
import { CardFeira } from "@/components/CardFeira";
import Switch from "@mui/material/Switch";
import { Footer } from "@/components/Footer";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { Painel } from "@/components/Painel";
import { Cargos, temCargo } from "@/service/tokenService";
import Cookies from "js-cookie";
import api from "@/api/api";
import { Mensagem } from "@/components/Mensagem";
import { Feira } from "@/types/Feira";
import { ProdutorInterface } from "@/types/Produtor";
import ModalConfirmacao from "@/components/ModalConfirmacao";
import Toggle from "@/components/Toggle";

const getInformacoesFeiras = async (token: string) => {
  let feiras: [Feira] | [] = [];
  await api
    .get("/feira", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      feiras = response.data.reverse();
      feiras.forEach((feira) => {
        feira.dataAbertura = new Date(feira.dataAbertura).toLocaleDateString(
          "pt-BR"
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return feiras;
};

const getInformacoesProdutores = async (token: string) => {
  let produtores: [ProdutorInterface] | [] = [];
  await api
    .get("/produtor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      produtores = response.data.reverse();
    })
    .catch((error) => {
      console.log(error);
    });
  return produtores;
};

export default function Admin({ feirasSSR }: { feirasSSR: [Feira] | [] }) {
  const [modalProdutor, setModalProdutor] = useState(false);
  const [modalFeira, setModalFeira] = useState(false);
  const [infoFeira, setInfoFeira] = useState({
    taxaEntrega: "",
  });
  const [infoProdutor, setInfoProdutor] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    senhaRepetida: "",
  });
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<
    "sucesso" | "erro" | "aviso"
  >("sucesso");
  const [feiras, setFeiras] = useState<[Feira] | []>(feirasSSR);
  const [carregando, setCarregando] = useState(false);
  const [checked, setChecked] = useState(feirasSSR[0]?.aberta);
  const [textoSwitch, setTextoSwitch] = useState(
    feiras[0]?.aberta ? "Feira aberta!" : "Abrir feira"
  );
  const [modalConfirmacaoFeira, setModalConfirmacaoFeira] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(1);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModalConfirmacaoFeira(true);
  };

  const alterarDisponibilidadeFeira = async () => {
    const token = Cookies.get("token");
    const idFeiraRecente = feiras[0]?.id;
    setCarregando(true);
    await api
      .put(`/feira/${idFeiraRecente}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        setChecked(response.data.aberta);
        setTextoSwitch(response.data.aberta ? "Feira aberta!" : "Abrir feira");
        if (token) setFeiras(await getInformacoesFeiras(token));
        setModalConfirmacaoFeira(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setCarregando(false);
  };

  const validaCampos = () => {
    if (!infoProdutor.nome) {
      setMensagem("Preencha o nome do produtor");
      setTipoMensagem("erro");
      setMostrarMensagem(true);
      setModalProdutor(false);
      return false;
    }
    if (!infoProdutor.telefone) {
      setMensagem("Preencha o telefone do produtor");
      setTipoMensagem("erro");
      setMostrarMensagem(true);
      setModalProdutor(false);
      return false;
    }
    if (!infoProdutor.email) {
      setMensagem("Preencha o email do produtor");
      setTipoMensagem("erro");
      setMostrarMensagem(true);
      setModalProdutor(false);
      return false;
    }
    if (!infoProdutor.senha) {
      setMensagem("Preencha a senha do produtor");
      setTipoMensagem("erro");
      setMostrarMensagem(true);
      setModalProdutor(false);
      return false;
    }
    if (!infoProdutor.senhaRepetida) {
      setMensagem("Repita a senha do produtor");
      setTipoMensagem("erro");
      setMostrarMensagem(true);
      setModalProdutor(false);
      return false;
    }
    if (infoProdutor.senha !== infoProdutor.senhaRepetida) {
      setMensagem("As senhas não coincidem");
      setTipoMensagem("erro");
      setMostrarMensagem(true);
      setModalProdutor(false);
      return false;
    }
    return true;
  };

  const cadastrarProdutor = async () => {
    if (!validaCampos()) {
      setTimeout(() => {
        setMostrarMensagem(false);
      }, 7000);
      return;
    }
    setMostrarMensagem(false);
    const token = Cookies.get("token");
    setCarregando(true);
    await api
      .post(
        "/produtor",
        {
          nome: infoProdutor.nome,
          telefone: infoProdutor.telefone,
          email: infoProdutor.email,
          senha: infoProdutor.senha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setInfoProdutor({
          nome: "",
          telefone: "",
          email: "",
          senha: "",
          senhaRepetida: "",
        });
        setMensagem("Produtor cadastrado com sucesso!");
        setTipoMensagem("sucesso");
        setMostrarMensagem(true);
        setModalProdutor(false);
      })
      .catch((error) => {
        setMensagem("Erro ao cadastrar produtor!");
        setTipoMensagem("erro");
        setMostrarMensagem(true);
        setModalProdutor(false);
      });
    setCarregando(false);
  };

  const cadastrarFeira = async () => {
    setMostrarMensagem(false);
    const token = Cookies.get("token");
    setCarregando(true);

    await api
      .post(
        "/feira",
        {
          taxaEntrega: infoFeira.taxaEntrega,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMensagem("Feira cadastrada com sucesso!");
        setTipoMensagem("sucesso");
        setMostrarMensagem(true);
        setModalFeira(false);
      })
      .catch((error) => {
        setMensagem("Erro ao cadastrar feira!");
        setTipoMensagem("erro");
        setMostrarMensagem(true);
        setModalFeira(false);
      });
    setCarregando(false);
  };

  return (
    <>
      <Header tipo="admin" />
      <section className={styles.main}>
        <Painel
          img="/banner-admin.jpg"
          alt="Imagem de uma pessoa escolhendo uma verdura em um hortifruit"
          titulo="Painel do Administrador"
          subTitulo="O que você deseja fazer?"
        >
          <Button
            text="NOVA FEIRA"
            onClick={() => {
              setModalFeira(true);
            }}
            classType="botaoBannerPainel"
          />
          <Button
            backgroundColor="#72B234"
            text="CADASTRAR PRODUTOR"
            onClick={() => {
              setModalProdutor(true);
            }}
            classType="botaoBannerPainel"
          />
          <div className={styles.botaoSwitch}>
            <Switch color="warning" checked={checked} onChange={handleChange} />
            <p>{textoSwitch}</p>
          </div>
        </Painel>
        <div className={styles.divFeira}>
          <section className={styles.sectionFeira}>
            <section className={styles.headerAdmin}>
              <Toggle
                item1="Feiras"
                item2="Produtores"
                selected={1}
                onToggle={(item) => {
                  setItemSelecionado(item);
                }}
              />
            </section>
            <h1>Feiras</h1>
            {feiras.length > 0 ? (
              feiras.map((feira) => {
                return (
                  <CardFeira
                    key={feira.id}
                    id={feira.id}
                    valorFinal={feira.valorTotal}
                    data={feira.dataAbertura}
                    aberta={feira.aberta}
                  />
                );
              })
            ) : (
              <p>Não há feiras cadastradas</p>
            )}
          </section>
        </div>
      </section>

      <Modal
        onClickBotao={() => {
          const token = Cookies.get("token");
          cadastrarFeira();
          if (token) getInformacoesFeiras(token);
        }}
        setVisivel={() => {
          setModalFeira(false);
        }}
        loadingBotao={carregando}
        textoBotao="NOVA FEIRA"
        titulo="Cadastro de Feira"
        visivel={modalFeira}
      >
        <Input
          label="Taxa de Entrega"
          placeholder="R$00,00"
          type="number"
          value={Number(infoFeira.taxaEntrega).toFixed(2)}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
            const formattedValue = (Number(inputValue) / 100).toFixed(2); // Divide o valor por 100 para obter o valor decimal e formata com duas casas decimais
            setInfoFeira({ ...infoFeira, taxaEntrega: formattedValue });
          }}
        />
      </Modal>

      <ModalConfirmacao
        aviso="Tem certeza que deseja alterar a disponibilidade da feira?"
        mensagem="Ao fechar a feira nenhum cliente conseguirá fazer compras!"
        visivel={modalConfirmacaoFeira}
        setConfirmacaoVisivel={setModalConfirmacaoFeira}
        onClickBotao={alterarDisponibilidadeFeira}
        loadingBotao={carregando}
      />

      <Modal
        loadingBotao={carregando}
        onClickBotao={() => {
          cadastrarProdutor();
        }}
        setVisivel={() => {
          setModalProdutor(false);
        }}
        textoBotao="CADASTRAR PRODUTOR"
        titulo="Cadastro de Produtor"
        visivel={modalProdutor}
      >
        <Input
          label="Nome"
          placeholder="Nome do produtor"
          type="text"
          value={infoProdutor.nome}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, nome: e.target.value });
          }}
        />
        <Input
          label="Telefone"
          placeholder="Telefone do produtor"
          type="text"
          value={infoProdutor.telefone}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, telefone: e.target.value });
          }}
        />
        <Input
          label="E-mail"
          placeholder="E-mail do produtor"
          type="text"
          value={infoProdutor.email}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, email: e.target.value });
          }}
        />
        <Input
          label="Senha"
          placeholder="Senha temporária"
          type="password"
          value={infoProdutor.senha}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, senha: e.target.value });
          }}
        />
        <Input
          label="Repita a senha"
          placeholder="Repita a senha"
          type="password"
          value={infoProdutor.senhaRepetida}
          onChange={(e) => {
            setInfoProdutor({
              ...infoProdutor,
              senhaRepetida: e.target.value,
            });
          }}
        />
      </Modal>
      {mostrarMensagem && <Mensagem mensagem={mensagem} tipo={tipoMensagem} />}
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
  const feirasSSR = (await getInformacoesFeiras(token)) as [Feira] | [];
  const produtoresSSR = (await getInformacoesProdutores(token)) as
    | [ProdutorInterface]
    | [];

  return {
    props: { feirasSSR, produtoresSSR },
  };
}
