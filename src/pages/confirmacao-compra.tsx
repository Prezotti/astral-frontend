import styles from "../styles/pages/ConfirmacaoCompra.module.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { IoIosArrowBack } from "react-icons/io";
import { BsCartCheck } from "react-icons/bs";

export default function confirmacaoCompra() {
  return (
    <>
      <Header />
      <section className={styles.sectionConfirm}>
        <div className={styles.containerConfirm}>
          <div className={styles.containerMsgImagens}>
            <div className={styles.mensagem}>
              <h1 className={styles.titulo}>Pedido recebido!</h1>
              <BsCartCheck
                size={70}
                color="#72B234"
                fontWeight={700}
                className={styles.iconeCarrinho}
              />
              <p>
                Sua compra foi realizada com sucesso. Obrigado por escolher os
                produtos da nossa feira! :D
              </p>
            </div>
            <div className={styles.imagensProdutos}>
              <img src="../../img-confirmacao1.jpg" alt="Imagem de rúcula" />
              <img src="../../img-confirmacao2.jpg" alt="Imagem de couve" />
              <img src="../../img-confirmacao3.jpg" alt="Imagem de cenouras" />
              <img src="../../img-confirmacao4.jpg" alt="Imagem de limões" />
            </div>
          </div>

          <a href="/" className={styles.voltar}>
            <IoIosArrowBack size={24} color="#72B234" fontWeight={700} />
            Voltar para o Início
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
