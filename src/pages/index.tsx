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

export default function Home() {

  interface CategoriaInterface {
    [key: string]: boolean;
  }

  const [categorias, setCategorias] = useState<CategoriaInterface>({
    frutas: false,
    legumes: false,
    verduras: false,
    embalados: false,
    doces: false,
    granja: false,
    outros: false,
  });

  function toggleCategoriaAtiva(categoria: string): void{
    setCategorias((prevState) => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  }

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
          <Categoria imagem="/frutas.png" titulo="Frutas" categoriaAtiva={categorias.frutas} onClickfunc={() => toggleCategoriaAtiva('frutas')} />
          <Categoria imagem="/legumes.png" titulo="Legumes" categoriaAtiva={categorias.legumes} onClickfunc={() => toggleCategoriaAtiva('legumes')}/>
          <Categoria imagem="/verduras.png" titulo="Verduras" categoriaAtiva={categorias.verduras} onClickfunc={() => toggleCategoriaAtiva('verduras')}/>
          <Categoria imagem="/embalados.png" titulo="Embalados" categoriaAtiva={categorias.embalados} onClickfunc={() => toggleCategoriaAtiva('embalados')}/>
          <Categoria imagem="/doces-e-frutas.png" titulo="Doces e Frutas Secas" categoriaAtiva={categorias.doces} onClickfunc={() => toggleCategoriaAtiva('doces')}/>
          <Categoria imagem="/granja-e-pescados.png" titulo="Granja e Pescados" categoriaAtiva={categorias.granja} onClickfunc={() => toggleCategoriaAtiva('granja')}/>
          <Categoria imagem="/frutas.png" titulo="Outros" categoriaAtiva={categorias.outros} onClickfunc={() => toggleCategoriaAtiva('outros')}/>
        </section>
      </div>
      <div className={styles.produtosDiv}>
        <section className={styles.produtosSection}>
          <h2>Nossos Produtos</h2>
          <section className={styles.produtos}>
            {produtos.filter((produto) => {
              if (
                categorias.frutas && produto.categoria === "Frutas" ||
                categorias.legumes && produto.categoria === "Legumes" ||
                categorias.verduras && produto.categoria === "Verduras" ||
                categorias.embalados && produto.categoria === "Embalados" ||
                categorias.doces && produto.categoria === "Doces" ||
                categorias.granja && produto.categoria === "Granja" ||
                categorias.outros && produto.categoria === "Outros"
              ) {
                return true;
              } else if (
                !categorias.frutas &&
                !categorias.legumes &&
                !categorias.verduras &&
                !categorias.embalados &&
                !categorias.doces &&
                !categorias.granja &&
                !categorias.outros
              ) {
                return true;
              }
            }).map((produto) => {
              return (
                <Produto
                  imagem={produto.imagem}
                  descricao={produto.descricao}
                  preco={produto.preco}
                  medida={produto.medida}
                  produtor={produto.produtor}
                  qtdEstoque={produto.estoque}
                />
              );
            })}
          </section>
        </section>
      </div>
      <Footer />
    </>
  )
}
