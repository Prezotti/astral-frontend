import { Header } from "@/components/Header";
import styles from "../styles/pages/Carrinho.module.css";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { Button } from "@/components/Button";
import { Carrinho as CarrinhoClass } from "@/classes/Carrinho";
import { useEffect, useState } from "react";
import ItemCarrinho from "@/components/ItemCarrinho";
import { InformacoesCompra, Endereco } from "@/types/InformacoesCompra";

export default function Carrinho() {
  const [valorCarrinho, setValorCarrinho] = useState(0);
  const [carrinho, setCarrinho] = useState<CarrinhoClass>(new CarrinhoClass());
  const [informacoesCompra, setInformacoesCompra] = useState<InformacoesCompra>(
    {
      nome: "",
      telefone: "",
      formaPagamento: "",
      valorDoacao: 0,
      endereco: "",
      localEntrega: "",
      observacoes: "",
    }
  );
  const [endereco, setEndereco] = useState<Endereco>({
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    referencia: "",
  });
  const [pediuEntrega, setPediuEntrega] = useState(false);

  useEffect(() => {
    let carrinho = new CarrinhoClass();
    const carrinhoJSON = localStorage.getItem("carrinho");
    if (carrinhoJSON) {
      carrinho = carrinho.fromJSON(carrinhoJSON);
    }
    setValorCarrinho(carrinho.calcularTotal());
    setCarrinho(carrinho);
  }, []);

  function formatarTelefone(numeroTelefone: string) {
    const cleaned = numeroTelefone.replace(/\D/g, ""); // Remove qualquer caractere não numérico

    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/); // Divide o número em grupos: DDD, primeira parte e segunda parte

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`; // Formata o número de telefone como (00) 0000-0000 ou (00) 00000-0000
    }

    return numeroTelefone; // Retorna o número original se não for possível formatar
  }

  function valorTotal() {
    return (
      informacoesCompra.valorDoacao + valorCarrinho + (pediuEntrega ? 4 : 0)
    );
  }

  return (
    <>
      <section className={styles.pagina}>
        <Header tipo="cliente" valorCarrinho={valorCarrinho} />;
        <section className={styles.acaoSolidaria}>
          <div className={styles.divTitulo}>
            <h2 className={styles.titulo}>Ação Solidária</h2>
            <div className={styles.detalheTitulo}></div>
          </div>
          <section className={`${styles.card} ${styles.cardLargo}`}>
            <p>
              A Astral está realizando a doação de produtos saudáveis para
              famílias carentes do município de Santa Teresa. Caso você queira
              contribuir com essas doações, digite abaixo um valor que deseja
              doar. Ele será doado em forma de produtos disponíveis na semana e
              será computado no seu pedido particular. As famílias estão sendo
              selecionadas com o apoio da Associação Pestalozzi. Agradecemos o
              seu gesto de solidariedade!
            </p>
            <div className={styles.valorDoacao}>
              <label>Valor que deseja doar</label>
              <Input
                type="text"
                value={informacoesCompra.valorDoacao.toFixed(2)}
                placeholder="0.00"
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
                  const formattedValue = (Number(inputValue) / 100).toFixed(2); // Divide o valor por 100 para obter o valor decimal e formata com duas casas decimais
                  setInformacoesCompra({
                    ...informacoesCompra,
                    valorDoacao: Number(formattedValue),
                  });
                }}
                largura="100px"
              />
            </div>
          </section>
        </section>
        <section className={styles.informacoes}>
          <div className={styles.divTitulo}>
            <h2 className={styles.titulo}>Informações</h2>
            <div className={styles.detalheTitulo}></div>
          </div>
          <section className={`${styles.card} ${styles.cardLargo}`}>
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome"
              value={informacoesCompra.nome}
              onChange={(e) =>
                setInformacoesCompra({
                  ...informacoesCompra,
                  nome: e.target.value,
                })
              }
              largura="100%"
            />
            <Input
              label="Telefone"
              type="text"
              placeholder="(00) 0000-0000"
              value={formatarTelefone(informacoesCompra.telefone)}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, "");
                setInformacoesCompra({
                  ...informacoesCompra,
                  telefone: inputValue,
                });
              }}
              largura="100%"
            />
            <Select
              label="Forma de Pagamento"
              value={informacoesCompra.formaPagamento}
              onChange={(e) => {
                setInformacoesCompra({
                  ...informacoesCompra,
                  formaPagamento: e.target.value as
                    | "PICPAY"
                    | "PIX"
                    | "DINHEIRO",
                });
              }}
              largura="100%"
            >
              <option value="">Escolha uma opção</option>
              <option value="PICPAY">Antecipadamente pelo PICPAY</option>
              <option value="PIX">Antecipadamente pelo PIX</option>
              <option value="DINHEIRO">Dinheiro no ato do recebimento</option>
            </Select>
            <Select
              label="Opção de Recebimento"
              value={informacoesCompra.localEntrega}
              onChange={(e) => {
                if (e.target.value === "ENTREGA") {
                  setPediuEntrega(true);
                } else {
                  setPediuEntrega(false);
                }
                setInformacoesCompra({
                  ...informacoesCompra,
                  localEntrega: e.target.value as
                    | "ENTREGA"
                    | "SANTA_TERESA"
                    | "PATRIMONIO"
                    | "IFES",
                });
              }}
              largura="100%"
            >
              <option value="">Escolha uma opção</option>
              <option value="ENTREGA">Santa Teresa - Entrega</option>
              <option value="SANTA_TERESA">
                Santa Teresa - Buscar no local
              </option>
              <option value="PATRIMONIO">Patrimônio</option>
              <option value="IFES">IFES - Santa Teresa</option>
            </Select>
            {pediuEntrega && (
              <>
                <div className={styles.logradouro}>
                  <Input
                    label="Rua"
                    type="text"
                    placeholder="Digite sua rua"
                    value={endereco.rua}
                    onChange={(e) => {
                      setEndereco({ ...endereco, rua: e.target.value });
                    }}
                    largura="100%"
                  />
                  <Input
                    label="Nº"
                    type="text"
                    placeholder="Nº da casa"
                    value={endereco.numero}
                    onChange={(e) => {
                      setEndereco({ ...endereco, numero: e.target.value });
                    }}
                    largura="100%"
                  />
                </div>
                <div className={styles.bairroComplemento}>
                  <Input
                    label="Bairro"
                    type="text"
                    placeholder="Digite seu bairro"
                    value={endereco.bairro}
                    onChange={(e) => {
                      setEndereco({ ...endereco, bairro: e.target.value });
                    }}
                    largura="100%"
                  />
                  <Input
                    label="Complemento"
                    type="text"
                    placeholder="Complemento"
                    value={endereco.complemento}
                    onChange={(e) => {
                      setEndereco({ ...endereco, complemento: e.target.value });
                    }}
                    largura="100%"
                  />
                </div>
                <Input
                  label="Referência"
                  type="text"
                  placeholder="Ponto de eferência"
                  value={endereco.referencia}
                  onChange={(e) => {
                    setEndereco({ ...endereco, referencia: e.target.value });
                  }}
                  largura="100%"
                />
              </>
            )}
          </section>
        </section>
        <section className={styles.resumoTotal}>
          <section className={styles.observacoesCarrinho}>
            <section className={styles.observacoes}>
              <div className={styles.divTitulo}>
                <h2 className={styles.titulo}>Observação e Comentários</h2>
                <div className={styles.detalheTitulo}></div>
              </div>
              <section className={styles.card}>
                <textarea
                  name="observacoes"
                  id="observacoes"
                  value={informacoesCompra.observacoes}
                  onChange={(e) => {
                    setInformacoesCompra({
                      ...informacoesCompra,
                      observacoes: e.target.value,
                    });
                  }}
                  placeholder="Digite uma observação, comentário ou sugestão aqui!"
                ></textarea>
              </section>
            </section>
            <section className={styles.carrinho}>
              <div className={styles.divTitulo}>
                <h2 className={styles.titulo}>Meu Carrinho</h2>
                <div className={styles.detalheTitulo}></div>
              </div>
              <section className={styles.card}>
                <div className={styles.titulos}>
                  <p className={styles.descricaoProdutoTitulo}>Produto</p>
                  <p>Qtd.</p>
                  <p>Subtotal</p>
                </div>
                <div className={styles.linhaDivisaoCarrinho}></div>
                <section className={styles.produtosCarrinho}>
                  {carrinho.itens.map((item) => {
                    return (
                      <ItemCarrinho
                        item={item}
                        key={item.produto.id}
                        retorno={(item) => {
                          carrinho.adicionarItem(item);
                          setValorCarrinho(carrinho.calcularTotal());
                          localStorage.setItem(
                            "carrinho",
                            JSON.stringify(carrinho)
                          );
                        }}
                      />
                    );
                  })}
                </section>
              </section>
            </section>
          </section>
          <section className={styles.resumoPedido}>
            <div className={styles.divTitulo}>
              <h2 className={styles.titulo}>Resumo do Pedido</h2>
              <div className={styles.detalheTitulo}></div>
            </div>
            <section className={styles.card}>
              <section className={styles.resumo}>
                <div className={styles.linhaResumo}>
                  <p className={styles.col1Resumo}>
                    {carrinho.qtdProdutos()}{" "}
                    {carrinho.qtdProdutos() == 1 ? "item" : "itens"}
                  </p>
                  <p className={styles.col2Resumo}>
                    R$ {carrinho.calcularTotal().toFixed(2).replace(".", ",")}
                  </p>
                </div>
                {pediuEntrega && (
                  <div className={styles.linhaResumo}>
                    <p className={styles.col1Resumo}>Frete</p>
                    <p className={styles.col2Resumo}>R$ 4,00</p>
                  </div>
                )}
                {informacoesCompra.valorDoacao != 0 && (
                  <div className={styles.linhaResumo}>
                    <p className={styles.col1Resumo}>Ação Solidária</p>
                    <p className={styles.col2Resumo}>
                      R${" "}
                      {informacoesCompra.valorDoacao
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>
                )}
                <div className={styles.linhaDivisaoResumo}></div>
                <div className={`${styles.linhaResumo} ${styles.totalResumo}`}>
                  <p className={styles.col1Resumo}>Total</p>
                  <p className={styles.col2Resumo}>
                    R$ {valorTotal().toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <section className={styles.finalizacaoResumo}>
                  <p className={styles.infoPagamento}>
                    Pagar antecipadamente pelo PicPay. Transferir até segunda a
                    noite para{" "}
                    <span className={styles.linkPicpay}>@picpaydadurce</span> ou{" "}
                    <span className={styles.linkPicpay}>@picpaydaandressa</span>
                  </p>
                  <Button
                    text="FINALIZAR PEDIDO"
                    classType="botaoFinalizar"
                    onClick={() => {}}
                  />
                  <a className={styles.adicionarMais} href="/">
                    Adicionar mais produtos
                  </a>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
