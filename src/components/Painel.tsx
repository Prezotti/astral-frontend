import styles from "../styles/components/Painel.module.css";

interface PainelProps {
  img: string;
  alt: string;
  titulo: string;
  subTitulo: string;
  children: React.ReactNode;
}

export function Painel({ img, alt, titulo, subTitulo, children }: PainelProps) {
  return (
    <section className={styles.sectionPainel}>
      <div className={styles.painel}>
        <img src={img} alt={alt} />
        <section className={styles.conteudo}>
          <h1>{titulo}</h1>
          <p className={styles.subtitulo}>{subTitulo}</p>
          <div className={styles.botoes}>{children}</div>
        </section>
      </div>
    </section>
  );
}
