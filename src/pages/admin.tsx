import { Button } from "@/components/Button";
import styles from "../styles/pages/Admin.module.css";
import { Header } from "@/components/Header";
import { CardFeira } from "@/components/CardFeira";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { Footer } from "@/components/Footer";
import Modal from "@/components/Modal";
import Input from "@/components/Input";

export default function Admin() {
  const [checked, setChecked] = useState(true);
  const [textoSwitch, setTextoSwitch] = useState("Feira aberta!");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [infoProdutor, setInfoProdutor] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    senhaRepetida: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setTextoSwitch(event.target.checked ? "Feira aberta!" : "Abrir feira");
  };
  return (
    <>
      <Header tipo="admin" />
      <section className={styles.main}>
        <section className={styles.sectionPainel}>
          <div className={styles.painel}>
            <img
              src="/banner-admin.jpg"
              alt="Imagem de uma pessoa escolhendo uma verdura em um hortifruit"
            />
            <section className={styles.conteudo}>
              <h1>Painel do Administrador</h1>
              <p>O que você deseja fazer?</p>
              <div className={styles.botoes}>
                <Button
                  text="NOVA FEIRA"
                  onClick={() => {}}
                  classType="botaoBannerAdmin"
                />
                <Button
                  backgroundColor="#72B234"
                  text="CADASTRAR PRODUTOR"
                  onClick={() => {
                    setModalVisivel(true);
                  }}
                  classType="botaoBannerAdmin"
                />
                <div className={styles.botaoSwitch}>
                  <Switch
                    color="warning"
                    checked={checked}
                    onChange={handleChange}
                  />
                  <p>{textoSwitch}</p>
                </div>
              </div>
            </section>
          </div>
        </section>
        <div className={styles.divFeira}>
          <section className={styles.sectionFeira}>
            <h1>Feiras</h1>
            <CardFeira
              id={2}
              aberta={true}
              valorFinal={910.15}
              data="20/04/2023"
            />
            <CardFeira
              id={1}
              aberta={false}
              valorFinal={910.15}
              data="20/04/2023"
            />
          </section>
        </div>
      </section>
      <Modal
        onClickBotao={() => {
          console.log(infoProdutor);
        }}
        setVisivel={() => {
          setModalVisivel(false);
        }}
        textoBotao="CADASTRAR PRODUTOR"
        titulo="Cadastro de Produtor"
        visivel={modalVisivel}
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
      <Footer />
    </>
  );
}
