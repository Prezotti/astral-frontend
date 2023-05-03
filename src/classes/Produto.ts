import { Produtor } from "./Produtor";

export class Produto {
  #descricao: string;
  #preco: number;
  #medida: string;
  #produtor: Produtor;
  #qtdEstoque: number;
  #categoria: string;
  #imagem: string;
  #id: number;
  #disponivel: boolean;

  constructor(
    descricao: string,
    preco: number,
    medida: string,
    produtor: Produtor,
    qtdEstoque: number,
    categoria: string,
    imagem: string,
    id: number,
    disponivel: boolean
  ) {
    this.#descricao = descricao;
    this.#preco = preco;
    this.#medida = medida;
    this.#produtor = produtor;
    this.#qtdEstoque = qtdEstoque;
    this.#categoria = categoria;
    this.#imagem = imagem;
    this.#id = id;
    this.#disponivel = disponivel;
  }

  get descricao() {
    return this.#descricao;
  }
  get preco() {
    return this.#preco;
  }
  get medida() {
    return this.#medida;
  }
  get produtor() {
    return this.#produtor;
  }
  get qtdEstoque() {
    return this.#qtdEstoque;
  }
  get categoria() {
    return this.#categoria;
  }
  get imagem() {
    return this.#imagem;
  }
  get id() {
    return this.#id;
  }
  get disponivel() {
    return this.#disponivel;
  }
}
