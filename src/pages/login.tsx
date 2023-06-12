import styles from "../styles/pages/Login.module.css";
import { Cargos, temCargo } from "@/service/tokenService";

import { useState } from "react";
import { useRouter } from "next/router";

import api from "@/api/api";

import cookie from "js-cookie";

import isEmail from "validator/lib/isEmail";

import { IoIosArrowBack } from "react-icons/io";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Button } from "@/components/Button";
import { Mensagem } from "@/components/Mensagem";
import { KeyObject } from "crypto";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarMensagemLoginInvalido, setMostrarMensagemLoginInvalido] =
    useState(false);
  const [mostrarMensagemEmailInvalido, setMostrarMensagemEmailInvalido] =
    useState(false);
  const [mostrarMensagemSenhaEmBranco, setmostrarMensagemSenhaEmBranco] =
    useState(false);
  const [carregando, setCarregando] = useState(false);

  const [iconVerSenha, setIconVerSenha] = useState(true);

  const clicarIconSenha = () => {
    setIconVerSenha(!iconVerSenha);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMostrarMensagemEmailInvalido(false);
    setEmail(event.target.value);
  };

  const onChangeSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmostrarMensagemSenhaEmBranco(false);
    setSenha(event.target.value);
  };

  const router = useRouter();

  const testarEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      fazerLogin();
    }
  };

  const fazerLogin = () => {
    setMostrarMensagemLoginInvalido(false);

    if (!isEmail(email)) {
      setMostrarMensagemEmailInvalido(true);
      return;
    }
    if (senha.length === 0) {
      setmostrarMensagemSenhaEmBranco(true);
      return;
    }
    setCarregando(true);
    api
      .post("/login", { email: email, senha: senha })
      .then((response) => {
        if (response.status === 200) {
          cookie.set("token", response.data.token, {
            expires: 1 / 12,
            path: "/",
          });
          if (temCargo(response.data.token, Cargos.ADMINISTRADOR))
            router.push("/admin");
          if (temCargo(response.data.token, Cargos.PRODUTOR))
            router.push("/produtor");
        }
      })
      .catch((error) => {
        setMostrarMensagemLoginInvalido(true);
        setCarregando(false);
      });
  };

  return (
    <div className={styles.pagina}>
      <section className={styles.containerLogin}>
        <p>
          <IoIosArrowBack size={24} color="#72B234" fontWeight={700} />
          Voltar
        </p>

        <div className={styles.containerInputs}>
          <h1>LOGIN</h1>

          <div>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div>
            <label htmlFor="senha" className={styles.label}>
              Senha
            </label>
            <input
              type={iconVerSenha ? "password" : "text"}
              id="senha"
              className={styles.input}
              value={senha}
              onChange={onChangeSenha}
              onKeyDown={testarEnter}
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

          <Button
            text="ENTRAR"
            loading={carregando}
            onClick={() => {
              fazerLogin();
            }}
            classType="botaoLogin"
            backgroundColor="#72B234"
          />
        </div>
      </section>
      {mostrarMensagemLoginInvalido && (
        <Mensagem mensagem={`Login ou senha incorretos!`} tipo="erro" />
      )}
      {mostrarMensagemEmailInvalido && (
        <Mensagem mensagem={`Formato de e-mail incorreto`} tipo="erro" />
      )}
      {mostrarMensagemSenhaEmBranco && (
        <Mensagem mensagem={`Digite sua senha`} tipo="erro" />
      )}
    </div>
  );
}
