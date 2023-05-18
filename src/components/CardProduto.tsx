import styles from "../styles/components/CardProduto.module.css";
import { Button } from "./Button";

import { useState } from "react";
import { Mensagem } from "./Mensagem";
import { ItemCompra } from "@/classes/ItemCompra";
import { Produto } from "@/classes/Produto";
import ModalConfirmacao from "./ModalConfirmacao";
import Modal from "./Modal";
import Input from "./Input";
import Select from "./Select";
import EscolherArquivoInput from "./EscolherArquivoInput";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface CardProdutoProps {
  produto: Produto;
  type?: "cliente" | "produtor";
  retornaItem?: (item: ItemCompra) => void;
}

export function CardProduto({
  produto,
  retornaItem = () => {},
  type = "cliente",
}: CardProdutoProps) {
  const [quantidade, setQuantidade] = useState(0);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [disponivel, setDisponivel] = useState(produto.disponivel);
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
  const [modalDisponivelVisivel, setModalDisponivelVisivel] = useState(false);
  const [infoProduto, setInfoProduto] = useState({
    descricao: "",
    preco: "",
    qtdEstoque: "",
    qtdMedida: "",
    unMedida: "",
    categoria: "",
    imagem: "",
  });

  const item = new ItemCompra(quantidade, produto);

  const mudarBotao = (event: React.MouseEvent<HTMLButtonElement>) => {
    const botaoAddItem = event.currentTarget.parentElement?.querySelector(
      `.${styles.botaoAddItem}`
    ) as HTMLDivElement;
    event.currentTarget.classList.add(styles.desabilitado);
    botaoAddItem.classList.add(styles.ativoDiv);
    botaoAddItem.classList.remove(styles.desabilitado);
    setQuantidade(1);
    item.quantidade = 1;
    retornaItem(item);
  };

  const adicionarItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (quantidade < produto.qtdEstoque) {
      item.quantidade = quantidade + 1;
      retornaItem(item);
      setQuantidade(quantidade + 1);
      setMostrarMensagem(false);
    } else {
      setMostrarMensagem(true);
    }
  };

  const removerItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    item.quantidade = quantidade - 1;
    retornaItem(item);
    if (quantidade > 1) setQuantidade(quantidade - 1);
    if (quantidade === 1) {
      const botaoAddItem =
        event.currentTarget.parentElement?.parentElement?.querySelector(
          `.${styles.botaoAddItem}`
        ) as HTMLDivElement;
      const botaoComprar = event.currentTarget.parentElement?.parentElement
        ?.children[1] as HTMLButtonElement;
      botaoAddItem.classList.add(styles.desabilitado);
      botaoAddItem.classList.remove(styles.ativoDiv);
      botaoComprar.classList.remove(styles.desabilitado);
      setQuantidade(0);
    }
  };

  return (
    <section className={styles.cardProduto}>
      <img src={produto.imagem} alt="Imagem do produto" />
      <div className={styles.conteudo}>
        <div
          className={styles.descricao}
          style={!disponivel ? { color: "#b0b0b0" } : {}}
        >
          <h3>{produto.descricao}</h3>
          {type === "cliente" && (
            <p className={styles.nomeProdutor}>
              Produtores: {produto.produtor.nome}
            </p>
          )}
          {type === "produtor" && (
            <section
              className={styles.texto}
              style={!disponivel ? { color: "#b0b0b0" } : {}}
            >
              <p>R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
              <p className={styles.medida}>{produto.medida}</p>
            </section>
          )}
        </div>
        {type === "cliente" && (
          <div className={styles.infoComprar}>
            <section className={styles.texto}>
              <p>R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
              <p className={styles.medida}>{produto.medida}</p>
            </section>
            <Button
              text="COMPRAR"
              onClick={mudarBotao}
              classType="botaoProduto"
            />
            <div className={styles.botaoAddItem}>
              <button onClick={removerItem}>-</button>
              <p>{quantidade}</p>
              <button onClick={adicionarItem}>+</button>
            </div>
          </div>
        )}
        {type === "produtor" && (
          <div className={styles.opcoesProdutor}>
            <Button
              icon={MdModeEdit}
              classType="botaoOpcao"
              text=""
              onClick={() => {
                setModalEditarVisivel(true);
              }}
            />
            <Button
              icon={MdDelete}
              classType="botaoOpcao"
              text=""
              onClick={() => {
                setModalExcluirVisivel(true); //feitoo
              }}
            />

            {disponivel ? (
              <Button
                icon={AiFillEye}
                classType="botaoOpcao"
                text=""
                onClick={() => {
                  setModalDisponivelVisivel(true);
                  // setDisponivel(false);
                  //colocar função para mudar disponibilidade no banco
                }}
              />
            ) : (
              <Button
                icon={AiFillEyeInvisible}
                classType="botaoOpcao"
                text=""
                onClick={() => {
                  setDisponivel(true);
                  //colocar função para mudar disponibilidade no banco
                }}
              />
            )}
          </div>
        )}
      </div>
      {mostrarMensagem && (
        <Mensagem
          mensagem={`Este produto possui apenas ${produto.qtdEstoque} unidades em estoque!`}
          tipo="aviso"
        />
      )}

      <ModalConfirmacao
        aviso="Tem certeza que deseja excluir esse produto?"
        mensagem="Ele será deletado permanentemente dos seus produtos!!"
        visivel={modalExcluirVisivel}
        setConfirmacaoVisivel={() => {
          setModalExcluirVisivel(false);
        }}
        onClickBotao={() => {}}
      />

      <ModalConfirmacao
        aviso="Tem certeza que deseja deixar este produto fora da feira desta semana??"
        mensagem="Ele não poderá ser comprado por outras pessoas!"
        visivel={modalDisponivelVisivel}
        setConfirmacaoVisivel={() => {
          setModalDisponivelVisivel(false);
        }}
        onClickBotao={() => {
          setDisponivel(false);
          setModalDisponivelVisivel(false);
        }}
      />

<Modal
        onClickBotao={() => {
          console.log(infoProduto);
        }}
        setVisivel={() => {
          setModalEditarVisivel(false);
        }}
        textoBotao="Editar Produto"
        titulo="Editar Produto"
        visivel={modalEditarVisivel}
      >
        <Input
          label="Descrição"
          placeholder=""
          type="text"
          value={infoProduto.descricao}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, descricao: e.target.value });
          }}
        />
        <Input
          label="Preço"
          placeholder=""
          type="number"
          value={infoProduto.preco}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, preco: e.target.value });
          }}
        />
        <Input
          label="Estoque"
          placeholder=""
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
            placeholder="quantidade"
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
          label="Alterar Imagem"
          tipoArquivo="img"
          value={infoProduto.imagem}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, imagem: e.target.value });
          }}
        />
      </Modal>
    </section>
  );
}
