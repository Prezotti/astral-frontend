import styles from '../styles/components/Mensagem.module.css'

import { useEffect, useState } from 'react';

import { IoClose } from 'react-icons/io5';
import { AiOutlineWarning } from 'react-icons/ai';

interface MensagemProps {
    mensagem: string;
    tipo: 'sucesso' | 'erro' | 'aviso';
}


export function Mensagem({mensagem, tipo}: MensagemProps){

    const [visivel, setVisivel] = useState(true);

    useEffect(() => {
        fadeIn();
        setTimeout(() => {
            fadeOut();
            setTimeout(() => {
                setVisivel(false);
            }
            , 200);
        }, 6500);
    }, []);


    const fadeIn = () => {
        const mensagem = document.querySelector(`.${styles.container}`);
        mensagem?.classList.add(styles.fadeIn);
    }

    const fadeOut = () => {
        const mensagem = document.querySelector(`.${styles.container}`);
        mensagem?.classList.add(styles.fadeOut);
    }

    const sair = () => {
        setVisivel(false);
    }

    return <>
        {visivel && 
        (
            <div className={`${styles.container} ${styles[tipo]}`}>
                {mensagem=="sucesso" ? <></> : <AiOutlineWarning color='#fff' size={20} className={styles.iconeAviso} />}
                <IoClose color='#fff' size={20} className={styles.iconeSair} onClick={sair} />
                <p>{mensagem}</p>
                <div className={styles.barraDeSumida} />
            </div>
        )}
        </>
}