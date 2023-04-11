import styles from '../styles/components/Header.module.css'

import { SearchBar } from './SearchBar'

export function Header() {

    const abrirMenuProdutores = () => {
        const menuProdutores = document.querySelector(`.${styles.menuProdutores}`) as HTMLDivElement
        menuProdutores.style.display = "flex"
    }

    const fecharMenuProdutores = () => {
        const menuProdutores = document.querySelector(`.${styles.menuProdutores}`) as HTMLDivElement
        menuProdutores.style.display = "none"
    }

    const ativaFiltroProdutor = (evento: React.MouseEvent<HTMLDivElement>) => {
        evento.currentTarget.classList.toggle(styles.ativo)
        //todo: adicionar filtro
    }



    const produtores = [ "Vanildo", "João", "Maria", "José", "ASdmiosajiod" ]

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerConteudo}>
                <img src="/icone-astral.png" alt="Astral logo" />
                <a href="/">Início</a>
                <a href="/sobre">Sobre</a>
                <SearchBar />
                <section onMouseEnter={abrirMenuProdutores} onMouseLeave={fecharMenuProdutores} className={styles.selectProdutores}>
                    <p>Produtores</p>
                    <section className={styles.menuProdutores}>
                        {produtores.map(produtor => {
                            return <div onClick={ativaFiltroProdutor}>{produtor}</div>
                        })}
                    </section>
                </section>
                <a href="/carrinho">Carrinho</a>
            </div>
        </header>
    )
}