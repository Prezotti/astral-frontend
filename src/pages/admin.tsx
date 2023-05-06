import { Button } from "@/components/Button";
import styles from "../styles/pages/Admin.module.css";
import { Header } from "@/components/Header";
import {CardFeira} from "@/components/CardFeira";

export default function Admin() {
  return (
    <body className="body">
      <Header tipo="admin" />
      <section className={styles.painelAdmin}>
        <div className={styles.banner}>
          <img
            src="/banner-admin.jpg"
            alt="Imagem de duas pessoas segurando um pote com tomates cerejas dentro"
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
            </div>
          </section>
        </div>
      </section>
      <div className={styles.divFeira}>
        <section className={styles.sectionFeira}>
          <h1>Feiras</h1>
          <CardFeira id={2} aberta={true} valorFinal={910.15} data="20/04/2023"/>
          <CardFeira id={1} aberta={false} valorFinal={910.15} data="20/04/2023"/>
        </section>
      </div>

    </body>
  );
}
