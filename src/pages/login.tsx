import { formControlClasses } from "@mui/material";
import styles from "../styles/pages/Login.module.css";
import { Button } from "@/components/Button";
import { IoIosArrowBack } from "react-icons/io";

export default function Login() {
  return (
    <div className={styles.pagina}>
      <form className={styles.containerLogin}>
        <p><IoIosArrowBack size={24} color="#72B234" fontWeight={700}/>Voltar</p>
        
        <div className={styles.containerInputs}>
        <h1>LOGIN</h1>

        <div>
          <label htmlFor="email" className={styles.label}>E-mail</label>
          <input type="text" id="email" className={styles.input} />
        </div>

        <div>
          <label htmlFor="senha" className={styles.label}>Senha</label>
          <input type="password" id="senha" className={styles.input} />
        </div>

          <Button
            text="ENTRAR"
            onClick={() => {}}
            classType="botaoLogin"
            backgroundColor="#72B234"
          />
        </div>
      </form>
    </div>
  );
}
