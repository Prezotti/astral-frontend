import styles from "../styles/components/SearchBar.module.css";
import { useState } from "react";

export function SearchBar({
  render,
}: {
  render: (busca: string) => JSX.Element;
}) {
  const [busca, setBusca] = useState("");

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusca = e.target.value;
    setBusca(valorBusca); // Atualiza o estado de busca com o valor digitado
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Pesquisar Produtos..."
        value={busca}
        onChange={handleBuscaChange}
      />
      <button type="submit">
        <img src="/botao-pesquisar.png" alt="Search" />
      </button>
      {render(busca)}
    </div>
  );
}
