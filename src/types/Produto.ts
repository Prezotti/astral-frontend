import { ProdutorInterface } from "./Produtor";
export interface ProdutoInteface {
    descricao: string;
    preco: number;
    medida: string;
    produtor: ProdutorInterface;
    qtdEstoque: number;
    categoria: string;
    imagem: string;
    id: number;
    disponivel: boolean;
  }
  