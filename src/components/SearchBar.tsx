import styles from "../styles/components/SearchBar.module.css";
import { useState } from "react";

export function SearchBar({
  retornaBusca,
  placeholder = "Pesquisar produtos...",
  backgroudColor = "#fcf9f9",
}: {
  retornaBusca: (busca: string) => void;
  placeholder?: string;
  backgroudColor?: string;
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
        style={{ backgroundColor: backgroudColor }}
      />
      <button type="submit">
        <img src="/botao-pesquisar.png" alt="Search" />
      </button>
    </div>
  );
}
