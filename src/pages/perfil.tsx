import { Footer } from "@/components/Footer";
import styles from "../styles/pages/Perfil-produtor.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { Header } from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";
import Modal from "@/components/Modal";
import ModalConfirmacao from "@/components/ModalConfirmacao";
import { Cargos, getId, temCargo } from "@/service/tokenService";
import { GetServerSidePropsContext } from "next";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { ProdutorInterface } from "@/types/Produtor";
import api from "@/api/api";
import { Produtor as ProdutorClass } from "@/classes/Produtor";
import { Mensagem } from "@/components/Mensagem";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const getInformacoesProdutor = async (
  token: string
): Promise<ProdutorInterface> => {
  const id = getId(token);
  let produtor;
  await api
    .get(`/produtor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const nome = response.data.nome;
      const disponivel = response.data.disponivel;
      const telefone = response.data.telefone;
      const email = response.data.email;
      const id = response.data.id;
      produtor = {
        nome,
        disponivel,
        telefone,
        email,
        id,
      };
    });

  if (!produtor) {
    throw new Error("Erro ao buscar informações do produtor");
  }
  return produtor;
};

export default function perfilProdutor({
  produtorJSON,
}: {
  produtorJSON: ProdutorInterface;
}) {
  const [modalDados, setModalDados] = useState(false);
  const [modalSenha, setModalSenha] = useState(false);
  const [modalEncerrarSessao, setModalEncerrarSessao] = useState(false);
  const [botaCarregamento, setBotaoCarregamento] = useState(false);

  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<
    "sucesso" | "erro" | "aviso"
  >("sucesso");

  const [produtor, setProdutor] = useState(
    new ProdutorClass(
      produtorJSON.nome,
      produtorJSON.disponivel,
      produtorJSON.telefone,
      produtorJSON.email,
      produtorJSON.id
    )
  );

  const [infoProdutor, setInfoProdutor] = useState({
    nome: produtor.nome,
    telefone: produtor.telefone,
    email: produtor.email,
  });

  const [senhaProdutor, setSenhaProdutor] = useState({
    novaSenha: "",
    senhaRepetida: "",
  });

  const [iconVerSenha, setIconVerSenha] = useState(true);
  const [iconVerSenhaRepetida, setIconVerSenhaRepetida] = useState(true);

  const clicarIconSenha = () => {
    setIconVerSenha(!iconVerSenha);
  };

  const clicarIconSenhaRepetida = () => {
    setIconVerSenhaRepetida(!iconVerSenhaRepetida);
  };

  const router = useRouter();

  const EncerrarSessao = () => {
    cookie.remove("token");
    router.push("/");
  };

  const validaCamposDados = () => {
    if (!infoProdutor.nome) {
      setMensagem("Preencha o seu nome!");
      setTipoMensagem("erro");
      setmostrarMensagem(true);
      setModalDados(false);
      return false;
    }
    if (!infoProdutor.telefone) {
      setMensagem("Preencha o seu telefone!");
      setTipoMensagem("erro");
      setmostrarMensagem(true);
      setModalDados(false);
      return false;
    }
    if (!infoProdutor.email) {
      setMensagem("Preencha o seu email!");
      setTipoMensagem("erro");
      setmostrarMensagem(true);
      setModalDados(false);
      return false;
    }
    return true;
  };

  const editarDados = async () => {
    if (!validaCamposDados()) {
      setTimeout(() => {
        setmostrarMensagem(false);
      }, 7000);
      return;
    }
    setmostrarMensagem(false);
    const token = cookie.get("token");
    setBotaoCarregamento(true);
    await api
      .put(
        `/produtor`,
        {
          id: produtor.id,
          nome: infoProdutor.nome,
          email: infoProdutor.email,
          telefone: infoProdutor.telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMensagem("Seus dados foram editados com sucesso!");
        setmostrarMensagem(true);
        setTipoMensagem("sucesso");
        setProdutor(
          new ProdutorClass(
            response.data.nome,
            response.data.disponivel,
            response.data.telefone,
            response.data.email,
            response.data.id
          )
        );

        setModalDados(false);
      })
      .catch((error) => {
        setMensagem(
          "Não foi possível editar seus dados agora. Tente mais tarde!"
        );
        setmostrarMensagem(true);
        setTipoMensagem("erro");
      });
    setBotaoCarregamento(false);
  };

  const validaCamposSenha = () => {
    if (!senhaProdutor.novaSenha) {
      setMensagem("Digite sua nova senha!");
      setTipoMensagem("erro");
      setmostrarMensagem(true);
      setModalSenha(false);
      return false;
    }
    if (!senhaProdutor.senhaRepetida) {
      setMensagem("Repita sua nova senha!");
      setTipoMensagem("erro");
      setmostrarMensagem(true);
      setModalSenha(false);
      return false;
    }
    if (senhaProdutor.novaSenha != senhaProdutor.senhaRepetida) {
      setMensagem("As senhas não coincidem!");
      setTipoMensagem("erro");
      setmostrarMensagem(true);
      setModalSenha(false);
      return false;
    }
    return true;
  };

  const editarSenha = async () => {
    if (!validaCamposSenha()) {
      setTimeout(() => {
        setmostrarMensagem(false);
      }, 7000);
      return;
    }
    setmostrarMensagem(false);
    const token = cookie.get("token");
    setBotaoCarregamento(true);
    await api
      .put(
        `/produtor`,
        {
          id: produtor.id,
          senha: senhaProdutor.novaSenha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMensagem("Sua senha foi alterada com sucesso!");
        setmostrarMensagem(true);
        setTipoMensagem("sucesso");
        setModalSenha(false);
      })
      .catch((error) => {
        setMensagem(
          "Não foi possível editar sua senha agora. Tente mais tarde!"
        );
        setmostrarMensagem(true);
        setTipoMensagem("erro");
      });
    setBotaoCarregamento(false);
  };

  function formatarTelefone(numeroTelefone: string) {
    const cleaned = numeroTelefone.replace(/\D/g, ""); // Remove qualquer caractere não numérico

    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/); // Divide o número em grupos: DDD, primeira parte e segunda parte

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`; // Formata o número de telefone como (00) 0000-0000 ou (00) 00000-0000
    }

    return numeroTelefone; // Retorna o número original se não for possível formatar
  }

  return (
    <>
      <section className={styles.body}>
        <Header tipo="produtor" />
        <section className={styles.sectionPerfil}>
          <div className={styles.containerPerfil}>
            <h1 className={styles.titulo}>
              Olá {produtor.nome}! O que deseja fazer?
            </h1>

            <div className={styles.inputs}>
              <button
                className={`${styles.botao} ${styles.botaoEditar}`}
                onClick={() => {
                  setModalDados(true);
                }}
                type="button"
              >
                Editar Dados
              </button>
              <button
                className={`${styles.botao} ${styles.botaoEditar}`}
                onClick={() => {
                  setModalSenha(true);
                }}
                type="button"
              >
                Editar Senha
              </button>

              <button
                className={`${styles.botao} ${styles.botaoEncerrar}`}
                onClick={() => {
                  setModalEncerrarSessao(true);
                }}
                type="button"
              >
                Encerrar Sessão
              </button>
            </div>

            <a href="/" className={styles.voltar}>
              <IoIosArrowBack size={24} color="#72B234" fontWeight={700} />
              Voltar para o Início
            </a>
          </div>
        </section>
        <Footer />
      </section>

      <Modal
        loadingBotao={botaCarregamento}
        onClickBotao={() => {
          editarDados();
        }}
        setVisivel={() => {
          setModalDados(false);
        }}
        textoBotao="EDITAR DADOS"
        titulo="Edite seus dados"
        visivel={modalDados}
      >
        <Input
          label="Nome"
          placeholder="Seu nome"
          type="text"
          value={infoProdutor.nome}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, nome: e.target.value });
          }}
        />
        <Input
          label="Telefone"
          placeholder="Seu telefone"
          type="text"
          value={formatarTelefone(infoProdutor.telefone)}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, "");
            setInfoProdutor({
              ...infoProdutor,
              telefone: inputValue,
            });
          }}
        />
        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          type="text"
          value={infoProdutor.email}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, email: e.target.value });
          }}
        />
      </Modal>

      <ModalConfirmacao
        aviso="Tem certeza que deseja encerrar sua sessão?"
        visivel={modalEncerrarSessao}
        setConfirmacaoVisivel={setModalEncerrarSessao}
        onClickBotao={() => {
          EncerrarSessao();
        }}
        loadingBotao={botaCarregamento}
      />

      <Modal
        loadingBotao={botaCarregamento}
        onClickBotao={() => {
          editarSenha();
        }}
        setVisivel={() => {
          setModalSenha(false);
        }}
        textoBotao="EDITAR SENHA"
        titulo="Edite sua senha"
        visivel={modalSenha}
      >
        <div className={styles.divNovaSenha}>
          <Input
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            type={iconVerSenha ? "password" : "text"}
            value={senhaProdutor.novaSenha}
            onChange={(e) => {
              setSenhaProdutor({ ...senhaProdutor, novaSenha: e.target.value });
            }}
          />
          {iconVerSenha && (
            <AiFillEyeInvisible
              className={styles.iconVerSenha}
              onClick={clicarIconSenha}
            />
          )}
          {!iconVerSenha && (
            <AiFillEye
              className={styles.iconNaoVerSenha}
              onClick={clicarIconSenha}
            />
          )}
        </div>
        <div className={styles.divConfirmarSenha}>
          <Input
            label="Confirmar Senha"
            placeholder="Confirme sua nova senha"
            type={iconVerSenhaRepetida ? "password" : "text"}
            value={senhaProdutor.senhaRepetida}
            onChange={(e) => {
              setSenhaProdutor({
                ...senhaProdutor,
                senhaRepetida: e.target.value,
              });
            }}
          />
          {iconVerSenhaRepetida && (
            <AiFillEyeInvisible
              className={styles.iconVerSenha}
              onClick={clicarIconSenhaRepetida}
            />
          )}
          {!iconVerSenhaRepetida && (
            <AiFillEye
              className={styles.iconNaoVerSenha}
              onClick={clicarIconSenhaRepetida}
            />
          )}
        </div>
      </Modal>

      {mostrarMensagem && <Mensagem mensagem={mensagem} tipo={tipoMensagem} />}
    </>
  );
}

export async function getServerSideProps(contexto: GetServerSidePropsContext) {
  const token = contexto.req.cookies.token;
  if (token === undefined || !temCargo(token, Cargos.PRODUTOR)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const produtorJSON = (await getInformacoesProdutor(
    token
  )) as ProdutorInterface;
  return {
    props: {
      produtorJSON,
    },
  };
}
