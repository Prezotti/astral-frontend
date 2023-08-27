import { Produtor } from "./Produtor";

export class Produto {
  private _descricao: string;
  private _preco: number;
  private _medida: string;
  private _produtor: Produtor;
  private _qtdEstoque: number;
  private _categoria: string;
  private _imagem: string;
  private _id: number;
  private _disponivel: boolean;

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
    this._descricao = descricao;
    this._preco = preco;
    this._medida = medida;
    this._produtor = produtor;
    this._qtdEstoque = qtdEstoque;
    this._categoria = categoria;
    this._imagem = imagem;
    this._id = id;
    this._disponivel = disponivel;
  }

  get descricao() {
    return this._descricao;
  }
  get preco() {
    return this._preco;
  }
  get medida() {
    return this._medida;
  }
  get produtor() {
    return this._produtor;
  }
  get qtdEstoque() {
    return this._qtdEstoque;
  }
  get categoria() {
    return this._categoria;
  }
  get imagem() {
    return this._imagem;
  }
  get id() {
    return this._id;
  }
  get disponivel() {
    return this._disponivel;
  }

  set disponivel(disponivel: boolean) {
    this._disponivel = disponivel;
  }

  toggleDisponivel() {
    this._disponivel = !this._disponivel;
  }

  toJson() {
    return JSON.stringify(this);
  }

  fromJSON(json: string) {
    
    let produtor = new Produtor("", false, "", "", 0);
    produtor = produtor.fromJSON(JSON.stringify(JSON.parse(json)._produtor));

    let produto = new Produto(
      "",
      0,
      "",
      produtor,
      0,
      "",
      "",
      0,
      false
    );
    produto._descricao = JSON.parse(json)._descricao;
    produto._preco = JSON.parse(json)._preco;
    produto._medida = JSON.parse(json)._medida;
    produto._produtor = JSON.parse(json)._produtor;
    produto._qtdEstoque = JSON.parse(json)._qtdEstoque;
    produto._categoria = JSON.parse(json)._categoria;
    produto._imagem = JSON.parse(json)._imagem;
    produto._id = JSON.parse(json)._id;
    produto._disponivel = JSON.parse(json)._disponivel;
    return produto;
  }

}
