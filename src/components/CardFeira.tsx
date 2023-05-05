import { Button } from "@/components/Button";
import styles from "../styles/pages/Admin.module.css";
import {BiCalendar} from "react-icons/bi"
import {RiMoneyDollarCircleLine} from "react-icons/ri"
import {BsCircleFill} from "react-icons/bs"

interface CardFeiraProps{
     id : number;
     aberta: boolean;
     valorFinal : number;
     data : string;
}

export function CardFeira({id,aberta,valorFinal,data}: CardFeiraProps) {
  return (
    <div className={styles.divCard}>
      <div className={styles.esquerdaCard}>
        <h4>Feira {id}</h4>
        <p className={styles.centralizar}><RiMoneyDollarCircleLine/> R$ {valorFinal.toFixed(2).replace('.',',')}</p>
        <Button
          text="Consultar vendas"
          onClick={() => {}}
          classType="botaoCardFeira"
          backgroundColor= "#72B234"
        />
      </div>

      <div className={styles.direitaCard}>
         {aberta ? <p className={styles.aberta} > <BsCircleFill color="#72B234"/> Aberta </p> : <p className={styles.fechado}> <BsCircleFill color="#FF3D3D"/> Fechado</p> }  
        <p className={styles.centralizar}> <BiCalendar /> {data} </p>
      </div>
    </div>
  );
}
