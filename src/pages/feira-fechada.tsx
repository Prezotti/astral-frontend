import styles from "../styles/pages/FeiraFechada.module.css";

import { Footer } from "@/components/Footer";

import { TbMoodSad } from "react-icons/tb";

export default function feiraFechada() {
  return (
    <section className={styles.body}>
      <header className={styles.headerContainer}>
        <div className={styles.headerConteudo}>
          <img src="/icone-astral.png" alt="Astral logo" />
        </div>
      </header>

      <section className={styles.feiraFechada}>
        <h2>Nenhuma feira aberta no momento!</h2>
        <TbMoodSad size={70} color="#72B234" />

        <p>
          Nossa feira funciona recebendo pedidos das sextas-feiras aos domingos,
          até as 20h. As cestas são cuidadosamente preparadas nas
          segundas-feiras e estarão prontas para retirada ou entrega a partir
          das terças-feiras.
        </p>

        <p>
          Agradecemos muito pela sua compreensão enquanto nos preparamos para
          trazer produtos frescos e de qualidade até você. Esperamos vê-lo em
          breve na nossa feira!
        </p>
      </section>

      <Footer />
    </section>
  );
}
