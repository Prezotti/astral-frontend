import { Button } from "@/components/Button";
import styles from "../styles/components/CardFeira.module.css";
import { BiCalendar } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface CardFeiraProps {
  id: number;
  aberta: boolean;
  valorFinal: number;
  data: string;
}

export function CardFeira({ id, aberta, valorFinal, data }: CardFeiraProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/vendas/${id}`);
  };

  return (
    <div className={styles.divCard}>
      <div className={styles.linhaUm}>
        <h4>Feira {id}</h4>
        {aberta ? (
          <p className={styles.aberta}>
            {" "}
            <BsCircleFill color="#72B234" /> Aberta{" "}
          </p>
        ) : (
          <p className={styles.fechado}>
            {" "}
            <BsCircleFill color="#FF3D3D" /> Fechado
          </p>
        )}
      </div>
      <div className={styles.linhaDois}>
        <p className={styles.centralizar}>
          <RiMoneyDollarCircleLine /> R${" "}
          {valorFinal.toFixed(2).replace(".", ",")}
        </p>
      </div>

      <div className={styles.linhaTres}>
        <Button
          text="Consultar vendas"
          onClick={() => {
            handleClick();
          }}
          classType="botaoCardFeira"
          backgroundColor="#72B234"
        />
        <p className={styles.centralizar}>
          {" "}
          <BiCalendar /> {data}{" "}
        </p>
      </div>
    </div>
  );
}
