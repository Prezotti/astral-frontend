import styles from '../styles/components/Categoria.module.css';

interface CategoriaProps {
    imagem : string;
    titulo : string;
}

export function Categoria({imagem, titulo} : CategoriaProps) {

    function colocaBorda(event : React.MouseEvent<HTMLImageElement>) {
        if(event.currentTarget.parentElement!=null)
        event.currentTarget.parentElement.classList.toggle(styles.borda)
        console.log(event.currentTarget)
    }

    return(
        <div className={styles.categoria}>
            <div>
                <img src={imagem} alt={titulo} className={styles.categoriaImg} onClick={colocaBorda}/>
            </div>
            <p>{titulo}</p>
        </div>
    )
}