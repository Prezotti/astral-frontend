import { Header } from "@/components/Header";
import styles from "../styles/pages/Sobre.module.css";
import { Footer } from "@/components/Footer";

export default function sobre() {
  return (
    <section className={styles.body}>
      <Header />
      <section className={styles.main}>
        <section className={styles.sectionAstral}>
          <section className={styles.informacoes}>
            <h1 className={styles.titulo}>O que é ASTRAL?</h1>
            <section className={styles.textos}>
              <div className={styles.paragrafo}>
                <div className={styles.ponto}></div>
                <p>ASTRAL significa Associação Santa Teresa de Agroecologia.</p>
              </div>
              <div className={styles.paragrafo}>
                <div className={styles.ponto}></div>
                <p>
                  Uma associação sem fins lucrativos, que visa o desenvolvimento
                  sustentável por meio da agroecologia.
                </p>
              </div>
              <div className={styles.paragrafo}>
                <div className={styles.ponto}></div>
                <p>
                  Possuímos uma feira online com diversos produtos, que vão
                  direto dos produtores para sua mesa!
                </p>
              </div>
            </section>
          </section>
          <img className={styles.imgSacola} src="/sacola-sobre.png" alt="" />
        </section>
        <section className={styles.sectionFuncionamentoFeira}></section>
      </section>
      <Footer />
    </section>
  );
}
