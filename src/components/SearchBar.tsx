import styles from "../styles/components/SearchBar.module.css";
import { useState } from "react";

export function SearchBar({
  retornaBusca,
  placeholder = "Pesquisar produtos...",
}: {
  retornaBusca: (busca: string) => void;
  placeholder?: string;
}) {
  const [busca, setBusca] = useState("");

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusca = e.target.value;
    setBusca(valorBusca);
    retornaBusca(valorBusca);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder={placeholder}
        value={busca}
        onChange={handleBuscaChange}
      />
      <button type="submit">
        <img src="/botao-pesquisar.png" alt="Search" />
      </button>
    </div>
  );
}
