import styles from '../styles/components/Header.module.css'

import { SearchBar } from './SearchBar'

export function Header() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/icone-astral.png" alt="Astral logo" />
                <a className={styles.active} href="/">Início</a>
                <a href="/sobre">Sobre</a>
                <SearchBar />
                <select>
                    <option>Produtores</option>
                </select>
                <a href="/carrinho">Carrinho</a>
            </div>
        </header>
    )
}