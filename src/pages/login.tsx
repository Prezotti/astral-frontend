import styles from "../styles/pages/Login.module.css";
import { Cargos } from "@/cargos/cargos";

import { useState } from "react";
import { useRouter } from "next/router";

import api from "@/api/api";

import jwt, { JwtPayload } from "jsonwebtoken";

import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/Button";
import { Mensagem } from "@/components/Mensagem";

export interface TokenDecodificado extends JwtPayload {
  role: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const router = useRouter();

  const fazerLogin = () => {
    setMostrarMensagem(false);
    api
      .post("/login", { email: email, senha: senha })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          const tokenDecodificado = jwt.decode(
            response.data.token
          ) as TokenDecodificado;
          if (tokenDecodificado.role === Cargos.ADMIN) {
            router.push("/admin");
          }
          if (tokenDecodificado.role === Cargos.USER) {
            router.push("/produtor");
          }
        }
      })
      .catch((error) => {
        setMostrarMensagem(true);
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
              type="password"
              id="senha"
              className={styles.input}
              value={senha}
              onChange={onChangeSenha}
            />
          </div>

          <Button
            text="ENTRAR"
            onClick={() => {
              fazerLogin();
            }}
            classType="botaoLogin"
            backgroundColor="#72B234"
          />
        </div>
      </section>
      {mostrarMensagem && (
        <Mensagem mensagem={`Login ou senha incorretos!`} tipo="erro" />
      )}
    </div>
  );
}
