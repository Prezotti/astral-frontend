import styles from '../styles/components/Button.module.css'


interface ButtonProps {
    backgroundColor ?: string;
    color ?: string;
    height : number;
    width : number;
    text : string;
    onClick : (event:React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({backgroundColor = "#FA8001", color="#fff", height, width, text, onClick} : ButtonProps) {
    return (
        <button className={styles.button} style={{backgroundColor: backgroundColor, color, height: height, width: width, borderRadius: (height/4)}} onClick={onClick}>
            {text}
        </button>
    )
}