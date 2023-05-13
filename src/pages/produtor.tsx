import { Button } from "@/components/Button";
import Switch from "@mui/material/Switch";
import styles from "../styles/pages/Produtor.module.css";
import { Header } from "@/components/Header";
import { useState } from "react";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import EscolherArquivoInput from "@/components/EscolherArquivoInput";

export default function Produtor() {
  const [checked, setChecked] = useState(true);
  const [textoSwitch, setTextoSwitch] = useState("participar da feira");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [infoProduto, setInfoProduto] = useState({
    descricao: "",
    preco: "",
    qtdEstoque: "",
    qtdMedida: "",
    unMedida: "",
    categoria: "",
    imagem: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setTextoSwitch(
      event.target.checked ? "Participando da feira!" : "Participar da feira"
    );
  };

  return (
    <>
      <Header tipo="produtor" />
      <section className={styles.body}>
        <div className={styles.painel}>
          <img
            src="/img-painel-produtor.jpg"
            alt="Imagem de duas pessoas segurando um pote com tomates cerejas dentro"
          />
          <section className={styles.conteudo}>
            <h1>Olá, Henrique</h1>
            <p>O que você deseja fazer?</p>
            <div className={styles.botoes}>
              <Button
                text="CADASTRAR PRODUTO"
                onClick={() => {
                  setModalVisivel(true);
                }}
                classType="botaoBannerProdutor"
              />
              <Button
                backgroundColor="#72B234"
                text="CONSULTAR VENDAS"
                onClick={() => {}}
                classType="botaoBannerProdutor"
              />
              <div className={styles.botaoSwitch}>
                <Switch
                  color="warning"
                  checked={checked}
                  onChange={handleChange}
                />
                <p>{textoSwitch}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Modal
        onClickBotao={() => {
          console.log(infoProduto);
        }}
        setVisivel={() => {
          setModalVisivel(false);
        }}
        textoBotao="CADASTRAR PRODUTO"
        titulo="Cadastro de Produto"
        visivel={modalVisivel}
      >
        <Input
          label="Descrição"
          placeholder="Descrição do produtor"
          type="text"
          value={infoProduto.descricao}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, descricao: e.target.value });
          }}
        />
        <Input
          label="Preço"
          placeholder="Preço do produtor"
          type="number"
          value={infoProduto.preco}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, preco: e.target.value });
          }}
        />
        <Input
          label="Estoque"
          placeholder="Quantidade em estoque"
          type="number"
          value={infoProduto.qtdEstoque}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, qtdEstoque: e.target.value });
          }}
        />
        <Select
          label="Categoria"
          value={infoProduto.categoria}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, categoria: e.target.value });
          }}
        >
          <option value="FRUTAS">Fruta</option>
          <option value="LEGUMES">Legume</option>
          <option value="VERDURAS">Verdura</option>
          <option value="EMBALADOS">Embalado</option>
          <option value="DOCES">Doce</option>
          <option value="GRANJA">Granja</option>
          <option value="PESCADO">Pescado</option>
          <option value="OUTROS">Outros</option>
        </Select>
        <div className={styles.divMedida}>
          <Input
            largura="120px"
            label="Medida"
            placeholder="Quantidade"
            type="number"
            value={infoProduto.qtdMedida}
            onChange={(e) => {
              setInfoProduto({ ...infoProduto, qtdMedida: e.target.value });
            }}
          />
          <Select
            largura="120px"
            value={infoProduto.unMedida}
            onChange={(e) => {
              setInfoProduto({ ...infoProduto, unMedida: e.target.value });
            }}
          >
            <option value="Un.">Unidade</option>
            <option value="Dúzia">Dúzia</option>
            <option value="Crivo">Crivo</option>
            <option value="g.">Grama</option>
            <option value="Kg.">Quilo</option>
            <option value="Maço">Maço</option>
            <option value="Penca">Penca</option>
            <option value="Pacote">Pacote</option>
            <option value="Pote">Pote</option>
          </Select>
        </div>
        <EscolherArquivoInput
          label="Escolher imagem"
          tipoArquivo="img"
          value={infoProduto.imagem}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, imagem: e.target.value });
          }}
        />
      </Modal>
    </>
  );
}
