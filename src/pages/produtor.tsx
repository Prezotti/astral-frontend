import { useState } from "react";

import { GetServerSidePropsContext } from "next";
import { Cargos, temCargo, getId } from "@/service/tokenService";
import api from "@/api/api";
import { ProdutorInterface } from "@/types/Produtor";

import { Button } from "@/components/Button";
import Switch from "@mui/material/Switch";
import styles from "../styles/pages/Produtor.module.css";
import { Header } from "@/components/Header";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import EscolherArquivoInput from "@/components/EscolherArquivoInput";
import { Painel } from "@/components/Painel";
import { CardProduto } from "@/components/CardProduto";
import Cookies from "js-cookie";

import { Produtor as ProdutorClass } from "@/classes/Produtor";
import { ProdutoInteface } from "@/types/Produto";
import { Produto } from "@/classes/Produto";
import { Mensagem } from "@/components/Mensagem";
import { ImageCropper } from "@/components/ImageCropper";

const getInformacoesProdutor = async (
  token: string
): Promise<ProdutorInterface> => {
  const id = getId(token);
  let produtor;
  await api
    .get(`/produtor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const nome = response.data.nome;
      const disponivel = response.data.disponivel;
      const telefone = response.data.telefone;
      const id = response.data.id;
      produtor = {
        nome,
        disponivel,
        telefone,
        id,
      };
    });

  if (!produtor) {
    throw new Error("Erro ao buscar informações do produtor");
  }
  return produtor;
};

const getProdutosProdutor = async (
  token: string,
  id: number
): Promise<ProdutoInteface[]> => {
  let produtos: ProdutoInteface[] = [];
  await api
    .get(`/produto/produtor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      produtos = response.data;
    });

  if (!produtos) {
    return [];
  }

  return produtos;
};

export default function Produtor({
  produtorJSON,
  produtos,
}: {
  produtorJSON: ProdutorInterface;
  produtos: ProdutoInteface[];
}) {
  let produtor = new ProdutorClass(
    produtorJSON.nome,
    produtorJSON.disponivel,
    produtorJSON.telefone,
    produtorJSON.id
  );

  let produtosProdutor = produtos.map((produto) => {
    return new Produto(
      produto.descricao,
      produto.preco,
      produto.medida,
      produtor,
      produto.qtdEstoque,
      produto.categoria,
      produto.imagem,
      produto.id,
      produto.disponivel
    );
  });

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
  const [imagem, setImagem] = useState<File | null>();
  const [produtosProdutorState, setProdutosProdutorState] =
    useState(produtosProdutor);

  const [mostrarMensagemSucesso, setmostrarMensagemSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostrarMensagemErro, setmostrarMensagemErro] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [checked, setChecked] = useState(produtor.disponivel);
  const [textoSwitch, setTextoSwitch] = useState(
    checked ? "Participando!" : "Participar da feira"
  );
  const [mostrarImageCropper, setMostrarImageCropper] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [labelMessage, setLabelMessage] = useState("Escolher imagem");

  const alterarParticipacaoFeira = async (token: string, id: number) => {
    setmostrarMensagemErro(false);
    await api
      .put(
        `/produtor/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setChecked(!checked);
        setTextoSwitch(
          textoSwitch != "Participando!"
            ? "Participando!"
            : "Participar da feira"
        );
      })
      .catch((error) => {
        setMensagem(
          "Não foi possível trocar a disponibilidade agora. Tente mais tarde"
        );
        setmostrarMensagemErro(true);
      });
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }
    alterarParticipacaoFeira(token, produtor.id);
  };

  const atualizarProdutos = async () => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }
    let produtosProdutorJSON = await getProdutosProdutor(token, produtor.id);
    let produtosProdutor = produtosProdutorJSON.map((produto) => {
      return new Produto(
        produto.descricao,
        produto.preco,
        produto.medida,
        produtor,
        produto.qtdEstoque,
        produto.categoria,
        produto.imagem,
        produto.id,
        produto.disponivel
      );
    });

    setProdutosProdutorState(produtosProdutor);
  };

  const validaCampos = () => {
    if(!infoProduto.descricao){
      setMensagem("Preencha a descrição do produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    if(!infoProduto.preco){
      setMensagem("Preencha o preço do produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    if(!infoProduto.qtdEstoque){
      setMensagem("Preencha a quantidade em estoque do produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    if(!infoProduto.categoria){
      setMensagem("Escolha a categoria do produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    if(!infoProduto.qtdMedida){
      setMensagem("Preencha a quantidade de medida do produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    if(!infoProduto.unMedida){
      setMensagem("Escolha a unidade de medida do produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    if(!imagem){
      setMensagem("Selecione uma imagem para o produto");
      setmostrarMensagemErro(true);
      setModalVisivel(false);
      return false;
    }
    return true;
  }

  const cadastrarProduto = async () => {
    if(!validaCampos()){
      setTimeout(() => {
        setmostrarMensagemErro(false);
      }, 7000);
      return;
    }

    const jsonBlob = new Blob(
      [
        JSON.stringify({
          descricao: infoProduto.descricao,
          preco: infoProduto.preco,
          qtdEstoque: infoProduto.qtdEstoque,
          medida: `${
            infoProduto.qtdMedida == "1" ? "" : infoProduto.qtdMedida
          }${infoProduto.unMedida}`,
          categoria: infoProduto.categoria,
          produtorId: produtor.id,
        }),
      ],
      {
        type: "application/json",
      }
    );

    const formData = new FormData();
    formData.append("dados", jsonBlob, "dados.json");
    if (imagem) formData.append("file", imagem);
    setCarregando(true);
    await api
      .post(`/produto`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setMensagem("Produto cadastrado com sucesso!");
        setmostrarMensagemSucesso(true);
        setCarregando(false);
        atualizarProdutos();
      })
      .catch((error) => {
        if(error.response.status == 413){
          setMensagem("A imagem é muito grande. Tente uma imagem menor");
        }
        else
          setMensagem(
            "Não foi possível cadastrar o produto agora. Tente mais tarde"
          );
        setCarregando(false);
        setmostrarMensagemErro(true);
      });
    setModalVisivel(false);
    setCarregando(false);
    setImagem(null);
    setInfoProduto({
      descricao: "",
      preco: "",
      qtdEstoque: "",
      qtdMedida: "",
      unMedida: "",
      categoria: "",
      imagem: "",
    });
  };

  return (
    <>
      <Header tipo="produtor" />
      <Painel
        img="/img-painel-produtor.jpg"
        alt="Imagem de duas pessoas segurando um pote com tomates cerejas dentro"
        titulo={`Olá, ${produtor.nome}!`}
        subTitulo="O que você deseja fazer?"
      >
        <Button
          text="CADASTRAR PRODUTO"
          onClick={() => {
            setModalVisivel(true);
          }}
          classType="botaoBannerPainel"
        />
        <Button
          backgroundColor="#72B234"
          text="CONSULTAR VENDAS"
          onClick={() => {}}
          classType="botaoBannerPainel"
        />
        <div className={styles.botaoSwitch}>
          <Switch color="warning" checked={checked} onChange={handleChange} />
          <p>{textoSwitch}</p>
        </div>
      </Painel>
      <div className={styles.produtosDiv}>
        <section className={styles.produtosSection}>
          <h2>Seus Produtos</h2>
          <div className={styles.produtosContainer}>
            <div className={styles.produtosTexto}>
              <h3>Disponíveis</h3>
              <div />
            </div>
            <div className={styles.produtos}>
              {produtosProdutorState.map((produto) => {
                return produto.disponivel === true ? (
                  <CardProduto
                    key={produto.id}
                    produto={produto}
                    type="produtor"
                    onEdit={(mensagem) => {
                      setMensagem(mensagem);

                      setmostrarMensagemSucesso(true);
                      
                      atualizarProdutos();

                      setTimeout(() => {
                        setmostrarMensagemSucesso(false);
                      }, 7000);
                    }}
                  />
                ) : null;
              })}
            </div>
          </div>
          <div className={styles.produtosContainer}>
            <div className={styles.produtosTexto}>
              <h3>Indisponíveis</h3>
              <div />
            </div>
            <div className={styles.produtos}>
              {produtosProdutorState.map((produto) => {
                return produto.disponivel === false ? (
                  <CardProduto
                    key={produto.id}
                    produto={produto}
                    type="produtor"
                    onEdit={(mensagem) => {
                      setMensagem(mensagem);
                      setmostrarMensagemSucesso(true);

                      atualizarProdutos();

                      setTimeout(() => {
                        setmostrarMensagemSucesso(false);
                      }, 7000);
                    }}
                  />
                ) : null;
              })}
            </div>
          </div>
        </section>
      </div>

      <Modal
        onClickBotao={() => {
          cadastrarProduto();
        }}
        setVisivel={() => {
          setImagem(null);
          setInfoProduto({
            ...infoProduto,
            imagem: "",
          });
          setLabelMessage("Escolher Imagem");
          setModalVisivel(false);
        }}
        textoBotao="CADASTRAR PRODUTO"
        titulo="Cadastro de Produto"
        visivel={modalVisivel}
        loadingBotao={carregando}
      >
        <Input
          label="Descrição"
          placeholder="Descrição do produto"
          type="text"
          value={infoProduto.descricao}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, descricao: e.target.value });
          }}
        />
        <Input
          label="Preço"
          placeholder="Preço do produto"
          type="number"
          value={Number(infoProduto.preco)? Number(infoProduto.preco).toFixed(2): ""}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
            const formattedValue = (Number(inputValue) / 100).toFixed(2); // Divide o valor por 100 para obter o valor decimal e formata com duas casas decimais
            setInfoProduto({ ...infoProduto, preco: formattedValue });
          }}
        />
        <Input
          label="Estoque"
          placeholder="Quantidade em estoque"
          type="number"
          value={infoProduto.qtdEstoque}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
            const numericValue = parseInt(inputValue, 10);
            if(inputValue === ""){
              setInfoProduto({ ...infoProduto, qtdEstoque: "" });
            }
            if (!isNaN(numericValue) && numericValue >= 0) {
              setInfoProduto({ ...infoProduto, qtdEstoque: numericValue.toString() });
            }
          }}
        />
        <Select
          label="Categoria"
          value={infoProduto.categoria}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, categoria: e.target.value });
          }}
        >
          <option value="">Selecione</option>
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
              const inputValue = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
              const numericValue = parseInt(inputValue, 10);
              if(inputValue === ""){
                setInfoProduto({ ...infoProduto, qtdMedida: "" });
              }
              else if (!isNaN(numericValue) && numericValue >= 0) {
                setInfoProduto({ ...infoProduto, qtdMedida: numericValue.toString() });
              }
            }}
          />
          <Select
            largura="120px"
            value={infoProduto.unMedida}
            onChange={(e) => {
              setInfoProduto({ ...infoProduto, unMedida: e.target.value });
            }}
          >
            <option value="">Selecione</option>
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

          label={labelMessage}
          tipoArquivo="img"
          value={infoProduto.imagem}
          onChange={(e) => {
            setInfoProduto({ ...infoProduto, imagem: e.target.value });
            setImagem(e.target.files ? e.target.files[0] : null);
            setLabelMessage("Alterar imagem");
            if (e.target.files !== null && e.target.files.length > 0) {
              setMostrarImageCropper(true);
            }
          }}
        />
      </Modal>
      {mostrarMensagemSucesso && (
        <Mensagem mensagem={mensagem} tipo="sucesso" />
      )}
      {mostrarMensagemErro && <Mensagem mensagem={mensagem} tipo="erro" />}
      {mostrarImageCropper && (
        <ImageCropper
          src={imagem}
          closeCropper={() => {
            setMostrarImageCropper(false)
          }}
          fileName={infoProduto.descricao}
          goBack={() => {
            setImagem(null)
            setLabelMessage("Escolher Imagem")
            setMostrarImageCropper(false)
          }}
          returnFile={(file) => setImagem(file)}
        />
      )}
    </>
  );
}

export async function getServerSideProps(contexto: GetServerSidePropsContext) {
  const token = contexto.req.cookies.token;
  if (token === undefined || !temCargo(token, Cargos.PRODUTOR)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const produtorJSON = (await getInformacoesProdutor(
    token
  )) as ProdutorInterface;

  const produtos = (await getProdutosProdutor(
    token,
    getId(token)
  )) as ProdutoInteface[];
  return {
    props: {
      produtorJSON,
      produtos,
    },
  };
}
