import { Footer } from "@/components/Footer";
import styles from "../styles/pages/Perfil-produtor.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { Header } from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function perfilProdutor() {
    const [modalDados, setModalDados] = useState(false);
    const [modalSenha, setModalSenha] = useState(false);

    return (
        <>
            <section className={styles.body}>
                <Header />
                <section className={styles.sectionPerfil}>
                    <div className={styles.containerPerfil}>
                        <h1 className={styles.titulo}>Olá Henrique! Tudo bem?</h1>

                        <div className={styles.inputs}>
                            <div className={styles.divBotao}>
                                <button className={styles.botaoEditar} onClick={() => { setModalDados(true) }} type="button">Editar Dados</button>
                            </div>

                            <div className={styles.divBotao}>
                                <button className={styles.botaoEditar} onClick={() => { setModalSenha(true) }} type="button">Editar Senha</button>
                            </div>

                            <div className={styles.divBotao}>
                                <button className={styles.botaoEncerrar} type="button">Encerrar Sessão</button>
                            </div>
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
                onClickBotao={() => {
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
                    placeholder="Nome do produtor"
                    type="text"
                    value={""}
                    onChange={() => { }}
                />
                <Input
                    label="Telefone"
                    placeholder="Telefone do produtor"
                    type="text"
                    value={""}
                    onChange={() => { }}
                />
                <Input
                    label="E-mail"
                    placeholder="E-mail do produtor"
                    type="text"
                    value={""}
                    onChange={() => { }}
                />

            </Modal>

            <Modal
                onClickBotao={() => {
                }}
                setVisivel={() => {
                    setModalSenha(false);
                }}
                textoBotao="EDITAR SENHA"
                titulo="Edite sua senha"
                visivel={modalSenha}
            >
                <Input
                    label="Senha Atual"
                    placeholder="Digite sua senha"
                    type="password"
                    value={""}
                    onChange={() => { }}
                />
                <Input
                    label="Nova Senha"
                    placeholder="Digite sua nova senha"
                    type="password"
                    value={""}
                    onChange={() => { }}
                />
                <Input
                    label="Confirmar Senha"
                    placeholder="Confirme sua nova senha"
                    type="password"
                    value={""}
                    onChange={() => { }}
                />

            </Modal>
        </>

    );
};