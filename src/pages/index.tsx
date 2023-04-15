import styles from '../styles/pages/Home.module.css'

import { useState } from 'react';

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
    "estoque": 10,
    "categoria": "Frutas"
},{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Angélica e Vanildo",
  "estoque": 15,
  'categoria': 'Legumes'
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Pão caseiro com goiabada chinesa",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Henrique",
  "estoque": 10,
  'categoria': 'Verduras'
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Henrique",
  "estoque": 10,
  'categoria': 'Frutas'
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Kg",
  "produtor": "Henrique",
  "estoque": 10,
  'categoria': 'Embalados'
},
{
  "imagem": "https://tinypic.host/images/2023/04/12/imagem-produto.jpeg",
  "descricao": "Banana Prata",
  "preco": 2.50,
  "medida": "Dúzia",
  "produtor": "Henrique",
  "estoque": 10,
  'categoria': 'Doces',
}]

enum CategoriaEnum {
  FRUTAS = "Frutas",
  LEGUMES = "Legumes",
  VERDURAS = "Verduras",
  EMBALADOS = "Embalados",
  DOCES = "Doces",
  GRANJA = "Granja",
  OUTROS = "Outros",
}

interface CategoriaInterface {
  [key: string]: boolean;
}

export default function Home() {

  const [categorias, setCategorias] = useState<CategoriaInterface>({
    [CategoriaEnum.FRUTAS]: false,
    [CategoriaEnum.LEGUMES]: false,
    [CategoriaEnum.VERDURAS]: false,
    [CategoriaEnum.EMBALADOS]: false,
    [CategoriaEnum.DOCES]: false,
    [CategoriaEnum.GRANJA]: false,
    [CategoriaEnum.OUTROS]: false,
  });

  function toggleCategoriaAtiva(categoria: CategoriaEnum): void {
    setCategorias((prevState) => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  }

  const categoriasAtivas = Object.entries(categorias)
    .filter(([_, ativa]) => ativa)
    .map(([categoria, _]) => categoria as string);


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
          <Categoria imagem="/frutas.png" titulo="Frutas" categoriaAtiva={categorias[CategoriaEnum.FRUTAS]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.FRUTAS)} />
          <Categoria imagem="/legumes.png" titulo="Legumes" categoriaAtiva={categorias[CategoriaEnum.LEGUMES]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.LEGUMES)}/>
          <Categoria imagem="/verduras.png" titulo="Verduras" categoriaAtiva={categorias[CategoriaEnum.VERDURAS]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.VERDURAS)}/>
          <Categoria imagem="/embalados.png" titulo="Embalados" categoriaAtiva={categorias[CategoriaEnum.EMBALADOS]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.EMBALADOS)}/>
          <Categoria imagem="/doces-e-frutas.png" titulo="Doces e Frutas Secas" categoriaAtiva={categorias[CategoriaEnum.DOCES]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.DOCES)}/>
          <Categoria imagem="/granja-e-pescados.png" titulo="Granja e Pescados" categoriaAtiva={categorias[CategoriaEnum.GRANJA]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.GRANJA)}/>
          <Categoria imagem="/frutas.png" titulo="Outros" categoriaAtiva={categorias[CategoriaEnum.OUTROS]} onClickfunc={() => toggleCategoriaAtiva(CategoriaEnum.OUTROS)}/>
        </section>
      </div>
      <div className={styles.produtosDiv}>
        <section className={styles.produtosSection}>
          <h2>Nossos Produtos</h2>
          <section className={styles.produtos}>
            {produtos.map((produto) => {
              if (categoriasAtivas.length === 0) {
                return <Produto 
                  imagem={produto.imagem} descricao={produto.descricao} preco={produto.preco} 
                  medida={produto.medida} produtor={produto.produtor} qtdEstoque={produto.estoque}
                 />
              } else if (categoriasAtivas.includes(produto.categoria)) {
                return <Produto 
                  imagem={produto.imagem} descricao={produto.descricao} preco={produto.preco} 
                  medida={produto.medida} produtor={produto.produtor} qtdEstoque={produto.estoque}
                 />
              }})}
          </section>
        </section>
      </div>
      <Footer />
    </>
  )
}
