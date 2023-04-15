import styles from '../styles/components/Categoria.module.css';

import { useState } from 'react';

interface CategoriaProps {
    imagem : string;
    titulo : string;
    categoriaAtiva : boolean;
    onClickfunc : () => void;
}

export function Categoria({imagem, titulo, categoriaAtiva, onClickfunc} : CategoriaProps) {

    return(
        <div className={styles.categoria}  onClick={onClickfunc}>
            <div style={categoriaAtiva?{border:"#72B234 2px solid"}:{border:"none"}}>
                <img src={imagem} alt={titulo} className={styles.categoriaImg}/>
            </div>
            <p>{titulo}</p>
        </div>
    )
}