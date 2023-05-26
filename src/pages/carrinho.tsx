import { Header } from "@/components/Header";
import styles from "../styles/pages/Carrinho.module.css";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { Button } from "@/components/Button";
import { Carrinho as CarrinhoClass } from "@/classes/Carrinho";
import { useEffect, useState } from "react";

export default function Carrinho() {
  const [valorCarrinho, setValorCarrinho] = useState(0);
  const [carrinho, setCarrinho] = useState<CarrinhoClass>(new CarrinhoClass());
  useEffect(() => {
    let carrinho = new CarrinhoClass();
    const carrinhoJSON = localStorage.getItem("carrinho");
    if (carrinhoJSON) {
      carrinho = carrinho.fromJSON(carrinhoJSON);
    }
    setValorCarrinho(carrinho.calcularTotal());
    setCarrinho(carrinho);
  }, []);

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
                type="number"
                placeholder="20.00"
                value=""
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
              value=""
              largura="100%"
            />
            <Input
              label="Telefone"
              type="text"
              placeholder="Digite seu telefone"
              value=""
              largura="100%"
            />
            <Select
              label="Forma de Pagamento"
              value=""
              onChange={() => {}}
              largura="100%"
            >
              <option value="">Escolha uma opção</option>
              <option value="PICPAY">Antecipadamente pelo PICPAY</option>
              <option value="PIX">Antecipadamente pelo PIX</option>
              <option value="DINHEIRO">Dinheiro no ato do recebimento</option>
            </Select>
            <Select
              label="Opção de Recebimento"
              value=""
              onChange={() => {}}
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
            <div className={styles.logradouro}>
              <Input
                label="Rua"
                type="text"
                placeholder="Digite sua rua"
                value=""
                largura="100%"
              />
              <Input
                label="Nº"
                type="text"
                placeholder="Nº da casa"
                value=""
                largura="100%"
              />
            </div>
            <div className={styles.bairroComplemento}>
              <Input
                label="Bairro"
                type="text"
                placeholder="Digite seu bairro"
                value=""
                largura="100%"
              />
              <Input
                label="Complemento"
                type="text"
                placeholder="Complemento"
                value=""
                largura="100%"
              />
            </div>
            <Input
              label="Referência"
              type="text"
              placeholder="Ponto de eferência"
              value=""
              largura="100%"
            />
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
                      <div className={styles.linhaProduto}>
                        <p className={styles.descricaoProduto}>
                          {item.produto.descricao}
                        </p>
                        <div className={styles.qtdProduto}>
                          <div className={styles.botaoAddItem}>
                            <button onClick={() => {}}>-</button>
                            <p>{item.quantidade}</p>
                            <button onClick={() => {}}>+</button>
                          </div>
                          <p className={styles.removerItem}>Remover</p>
                        </div>
                        <p>
                          R$
                          {(item.produto.preco * item.quantidade)
                            .toFixed(2)
                            .replace(".", ",")}
                        </p>
                      </div>
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
                  <p className={styles.col1Resumo}>5 Produtos</p>
                  <p className={styles.col2Resumo}>R$ 37,00</p>
                </div>
                <div className={styles.linhaResumo}>
                  <p className={styles.col1Resumo}>Frete</p>
                  <p className={styles.col2Resumo}>R$ 4,00</p>
                </div>
                <div className={styles.linhaResumo}>
                  <p className={styles.col1Resumo}>Ação Solidária</p>
                  <p className={styles.col2Resumo}>R$ 10,00</p>
                </div>
                <div className={styles.linhaDivisaoResumo}></div>
                <div className={`${styles.linhaResumo} ${styles.totalResumo}`}>
                  <p className={styles.col1Resumo}>Total</p>
                  <p className={styles.col2Resumo}>R$ 51,00</p>
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
