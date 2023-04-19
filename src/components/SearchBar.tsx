import styles from "../styles/components/SearchBar.module.css";
import { useState } from "react";
import { nomeInput } from "../pages/";

export function SearchBar() {
  const [busca, setBusca] = useState("");

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusca = e.target.value;
    console.log(valorBusca); // Imprime o valor atual da busca no console
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
       {nomeInput({ nome: busca || "" })}
    </div>
    
  );
}