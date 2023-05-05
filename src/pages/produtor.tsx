import { Button } from "@/components/Button";
import Switch from "@mui/material/Switch";
import styles from "../styles/pages/Produtor.module.css";
import { Header } from "@/components/Header";
import { useState } from "react";

export default function Produtor() {
  const [checked, setChecked] = useState(true);
  const [textoSwitch, setTextoSwitch] = useState("participar da feira");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setTextoSwitch(
      event.target.checked ? "Participando da feira!" : "Participar da feira"
    );
  };

  return (
    <>
      <Header tipo="produtor" />
      <section className={styles.body}>
        <div className={styles.painel}>
          <img
            src="/img-painel-produtor.jpg"
            alt="Imagem de duas pessoas segurando um pote com tomates cerejas dentro"
          />
          <section className={styles.conteudo}>
            <h1>Olá, Henrique</h1>
            <p>O que você deseja fazer?</p>
            <div className={styles.botoes}>
              <Button
                text="CADASTRAR PRODUTO"
                onClick={() => {}}
                classType="botaoBannerProdutor"
              />
              <Button
                backgroundColor="#72B234"
                text="CONSULTAR VENDAS"
                onClick={() => {}}
                classType="botaoBannerProdutor"
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
    </>
  );
}
