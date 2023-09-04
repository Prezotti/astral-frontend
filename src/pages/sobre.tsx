import { Header } from "@/components/Header";
import styles from "../styles/pages/Sobre.module.css";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";

export default function sobre() {
  const router = useRouter();
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
        <h1 className={styles.titulo}>Como funciona a feira?</h1>
        <section className={styles.sectionFuncionamentoFeira}>
          <img className={styles.drawing} src="/drawing-sobre-nos.png" alt="" />
          <section className={styles.informacoes}>
            <section className={styles.textos}>
              <div className={styles.paragrafo}>
                <div className={styles.ponto}></div>
                <p>
                  Faça seu pedido no nosso site, entre sexta-feira e domingo às
                  20h.
                </p>
              </div>
              <div className={styles.paragrafo}>
                <div className={styles.ponto}></div>
                <p>
                  Os pedidos serão preparados na segunda-feira e estarão
                  disponíveis para você na terça-feira!
                </p>
              </div>
              <div className={styles.paragrafo}>
                <div className={styles.ponto}></div>
                <p>
                  Seus produtos poderão ser entregues em Santa Teresa ou poderão
                  ser retirados nos locais, depedendo da sua escolha!
                </p>
              </div>
            </section>
            <Button
              backgroundColor="#72b234"
              text="COMPRAR AGORA"
              onClick={() => {
                router.push("/");
              }}
              classType="botaoPaginaSobre"
            />
          </section>
        </section>
      </section>
      <Footer />
    </section>
  );
}
