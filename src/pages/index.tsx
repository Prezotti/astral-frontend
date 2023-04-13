import styles from '../styles/pages/Home.module.css'

import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Categoria } from '@/components/Categoria';
import { Produto } from '@/components/Produto';
import { Footer } from '@/components/Footer';
import { Mensagem } from '@/components/Mensagem';

const produtos = [{
    "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
    "descricao": "Banana Prata",
    "preco": 2.50,
    "medida": "Kg",
    "produtor": "Henrique",
    "estoque": 10
},{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Angélica e Vanildo",
  "estoque": 15
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Pão caseiro com goiabada chinesa",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Henrique",
  "estoque": 10
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Henrique",
  "estoque": 10
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Henrique",
  "estoque": 10
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Dúzia",
  "produtor": "Henrique",
  "estoque": 10
}]

export default function Home() {

  return (
    <>
      <Header />
      <div className={styles.banner}>
        <h1>Feira Astral</h1>
        <p>Nos dedicamos a entregar os melhores produtos orgânicos do município de Santa Teresa. Venha conhecer!</p>
        <a href="/sobre">
          <Button  height={36} width={140} text='SOBRE NÓS' onClick={()=>{}} />
        </a>
      </div>
      <div className={styles.categoriaDiv}>
        <h2>Filtrar por categoria</h2>
        <section className={styles.categorias}>
          <Categoria imagem="/frutas.png" titulo="Frutas" />
          <Categoria imagem="/legumes.png" titulo="Legumes" />
          <Categoria imagem="/verduras.png" titulo="Verduras" />
          <Categoria imagem="/embalados.png" titulo="Embalados" />
          <Categoria imagem="/doces-e-frutas.png" titulo="Doces e Frutas Secas" />
          <Categoria imagem="/granja-e-pescados.png" titulo="Granja e Pescados" />
          <Categoria imagem="/frutas.png" titulo="Outros" />
        </section>
      </div>
      <div className={styles.produtosDiv}>
        <section className={styles.produtosSection}>
          <h2>Nossos Produtos</h2>
          <section className={styles.produtos}>
            {produtos.map((produto)=>{
              return(
                <Produto imagem = {produto.imagem} descricao = {produto.descricao} preco = {produto.preco} medida = {produto.medida} produtor = {produto.produtor} qtdEstoque={produto.estoque}/>
              )
            })}
          </section>
        </section>
      </div>
      <Footer />
    </>
  )
}
