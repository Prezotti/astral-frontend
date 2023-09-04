import styles from "../styles/components/Footer.module.css";

import { AiFillHome } from "react-icons/ai";
import { BsTelephoneFill, BsInstagram } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.conteudo}>
        <section className={styles.logo}>
          <img src="/icone-astral.png" alt="Astral logo" />
        </section>
        <div className={styles.informacoes}>
          <section className={styles.contato}>
            <h3>Entre em Contato</h3>
            <div>
              <AiFillHome color="#72B234" />
              <p>Santa Teresa ES - 29650000</p>
            </div>
            <div>
              <BsTelephoneFill color="#72B234" />
              <p>(27) 99881-6248</p>
            </div>
            <div>
              <IoIosMail color="#72B234" />
              <p>feirastral@gmail.com</p>
            </div>
          </section>
          <section className={styles.redessociais}>
            <h3>Redes Sociais</h3>
            <div>
              <BsInstagram color="#72B234" />
              <p>
                <a
                  href="https://www.instagram.com/associacaoastral/"
                  target="_blank"
                >
                  @associacaoastral
                </a>
              </p>
            </div>
            <div className={styles.divLinha}> </div>
            <div>
              <FaSignInAlt color="#72B234" />
              <p>
                <a href="/login">Fazer login</a>
              </p>
            </div>
          </section>
        </div>
      </div>
      <section className={styles.copyright}>
        <p>© Todos os Direitos Reservados, EcoWebFeira 2023</p>
      </section>
    </footer>
  );
}
