import { Button } from "@/components/Button";
import styles from "../styles/pages/Admin.module.css";
import { Header } from "@/components/Header";
import { CardFeira } from "@/components/CardFeira";
import { useState } from "react";
import Switch from "@mui/material/Switch";

export default function Admin() {
  const [checked, setChecked] = useState(true);
  const [textoSwitch, setTextoSwitch] = useState("Feira aberta!");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setTextoSwitch(event.target.checked ? "Feira aberta!" : "Abrir feira");
  };
  return (
    <>
      <Header tipo="admin" />
      <section className={styles.body}>
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
                  onClick={() => {}}
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
        {/* <section className={styles.sectionFeira}>
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
        </section> */}
      </section>
    </>
  );
}
