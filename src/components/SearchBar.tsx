import styles from '../styles/components/SearchBar.module.css'

export function SearchBar() {
    return (
        <div className={styles.searchBarContainer}>
            <input type="text" placeholder="Pesquisar Produtos..." />
            <button type="submit">
                <img src="/botao-pesquisar.png" alt="Search" />
            </button>
        </div>
    )
}