import styles from "@/styles/components/CardProdutor.module.css";

import { ProdutorInterface } from "@/types/Produtor";
import api from "@/api/api";

import { BsCircleFill } from "react-icons/bs";
import { Button } from "./Button";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import ModalConfirmacao from "./ModalConfirmacao";
import Input from "./Input";
import Modal from "./Modal";
import Cookies from "js-cookie";
import { Mensagem } from "./Mensagem";

interface CardProdutorProps {
  produtor: ProdutorInterface;
  onEdit: () => void;
}

export default function CardProdutor({ produtor, onEdit }: CardProdutorProps) {
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
  const [modalDisponivelVisivel, setModalDisponivelVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [infoProdutor, setInfoProdutor] = useState<ProdutorInterface>(produtor);
  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<
    "sucesso" | "erro" | "aviso"
  >("sucesso");

  const formatarTelefone = (telefone: string) => {
    const ddd = telefone.slice(0, 2);
    const parteUm = telefone.slice(2, 7);
    const parteDois = telefone.slice(7, 11);
    return `(${ddd}) ${parteUm}-${parteDois}`;
  };

  const mudarDisponibilidade = async () => {
    setmostrarMensagem(false);
    const token = Cookies.get("token");
    setCarregando(true);
    await api
      .put(
        `/produtor/${produtor.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMensagem("Disponibilidade alterada com sucesso");
        setmostrarMensagem(true);
        setTipoMensagem("sucesso");
        setInfoProdutor({
          ...infoProdutor,
          disponivel: !infoProdutor.disponivel,
        });
        setModalDisponivelVisivel(false);
      })
      .catch((error) => {
        setMensagem(
          "Não foi possível trocar a disponibilidade agora. Tente mais tarde"
        );
        setmostrarMensagem(true);
        setTipoMensagem("erro");
      });
    setCarregando(false);
  };

  const deletarProdutor = async () => {
    setmostrarMensagem(false);
    const token = Cookies.get("token");
    setCarregando(true);
    await api
      .delete(`/produtor/${produtor.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMensagem("Produtor deletado com sucesso");
        setmostrarMensagem(true);
        setTipoMensagem("sucesso");
        setModalExcluirVisivel(false);
        onEdit();
      })
      .catch((error) => {
        setMensagem(
          "Não foi possível deletar o produtor agora. Tente mais tarde"
        );
        setmostrarMensagem(true);
        setTipoMensagem("erro");
      });
    setCarregando(false);
  };

  const editarProdutor = async () => {
    setmostrarMensagem(false);
    const token = Cookies.get("token");
    setCarregando(true);
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
        setMensagem("Produtor editado com sucesso");
        setmostrarMensagem(true);
        setTipoMensagem("sucesso");
        setModalEditarVisivel(false);
        onEdit();
      })
      .catch((error) => {
        setMensagem(
          "Não foi possível editar o produtor agora. Tente mais tarde"
        );
        setmostrarMensagem(true);
        setTipoMensagem("erro");
      });
    setCarregando(false);
  };

  return (
    <div className={styles.cardProdutorDiv}>
      <section className={styles.headerCardProdutor}>
        <h1>{produtor.nome}</h1>
        {infoProdutor.disponivel ? (
          <p className={styles.disponivel}>
            {" "}
            <BsCircleFill color="#72B234" /> Disponível
          </p>
        ) : (
          <p className={styles.indisponivel}>
            {" "}
            <BsCircleFill color="#FF3D3D" /> Indisponível
          </p>
        )}
      </section>
      <h3>{produtor.email}</h3>
      <h3>{formatarTelefone(produtor.telefone)}</h3>
      <div className={styles.opcoesProdutor}>
        <Button
          icon={MdModeEdit}
          classType="botaoOpcao"
          text=""
          onClick={() => {
            setModalEditarVisivel(true);
          }}
        />
        <Button
          icon={MdDelete}
          classType="botaoOpcao"
          text=""
          onClick={() => {
            setModalExcluirVisivel(true);
          }}
        />

        {infoProdutor.disponivel ? (
          <Button
            icon={AiFillEye}
            classType="botaoOpcao"
            text=""
            onClick={() => {
              setModalDisponivelVisivel(true);
            }}
          />
        ) : (
          <Button
            icon={AiFillEyeInvisible}
            classType="botaoOpcao"
            text=""
            onClick={() => {
              mudarDisponibilidade();
            }}
          />
        )}
      </div>
      <ModalConfirmacao
        aviso="Tem certeza que deseja excluir esse produtor?"
        mensagem="Ele será deletado permanentemente!!"
        visivel={modalExcluirVisivel}
        setConfirmacaoVisivel={() => {
          setModalExcluirVisivel(false);
        }}
        onClickBotao={() => {
          deletarProdutor();
        }}
        loadingBotao={carregando}
      />

      <ModalConfirmacao
        aviso="Tem certeza que deseja deixar este produtor indisponível?"
        mensagem="Ele não poderá participar da feira e seus produtos não estarão disponíveis!"
        visivel={modalDisponivelVisivel}
        setConfirmacaoVisivel={() => {
          setModalDisponivelVisivel(false);
        }}
        onClickBotao={() => {
          mudarDisponibilidade();
        }}
      />

      <Modal
        onClickBotao={() => {
          editarProdutor();
        }}
        loadingBotao={carregando}
        setVisivel={() => {
          setModalEditarVisivel(false);
        }}
        textoBotao="Editar Produtor"
        titulo="Editar Produtor"
        visivel={modalEditarVisivel}
      >
        <Input
          label="Nome do Produtor"
          placeholder=""
          type="text"
          value={infoProdutor.nome}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, nome: e.target.value });
          }}
        />
        <Input
          label="Email"
          placeholder=""
          type="email"
          value={infoProdutor.email}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, email: e.target.value });
          }}
        />
        <Input
          label="Telefone"
          placeholder=""
          type="text"
          value={infoProdutor.telefone}
          onChange={(e) => {
            setInfoProdutor({ ...infoProdutor, telefone: e.target.value });
          }}
        />
      </Modal>
      {mostrarMensagem && <Mensagem mensagem={mensagem} tipo={tipoMensagem} />}
    </div>
  );
}
