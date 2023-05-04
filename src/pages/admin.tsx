import { Button } from '@/components/Button';
import styles from '../styles/pages/Admin.module.css';
import { Header } from '@/components/Header';

export default function Admin() {
    return (
        <body className="body">
            <section className={styles.painelAdmin}>
                <Header tipo="admin"/>
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
                                onClick={() => { }}
                                classType="botaoBannerAdmin"
                            />
                            <Button
                                backgroundColor="#72B234"
                                text="CADASTRAR PRODUTOR"
                                onClick={() => { }}
                                classType="botaoBannerAdmin"
                            />
                        </div>
                    </section>
                </div>
            </section>
        </body>
    );
}