export class Produtor {
  private _nome: string;
  private _disponivel: boolean;
  private _telefone: string;
  private _email: string;
  private _id: number;

  constructor(nome: string, disponivel: boolean, telefone: string, email: string, id: number) {
    this._nome = nome;
    this._disponivel = disponivel;
    this._telefone = telefone;
    this._email = email;
    this._id = id;
  }

  get nome() {
    return this._nome;
  }
  get disponivel() {
    return this._disponivel;
  }
  get telefone() {
    return this._telefone;
  }
  get email() {
    return this._email;
  }
  get id() {
    return this._id;
  }

  toJson() {
    return JSON.stringify(this);
  }

  toggleDisponivel() {
    this._disponivel = !this._disponivel;
  }

  fromJSON(json: string) {
    let produtor = new Produtor("", false, "", "", 0);
    produtor._nome = JSON.parse(json)._nome;
    produtor._disponivel = JSON.parse(json)._disponivel;
    produtor._telefone = JSON.parse(json)._telefone;
    produtor._id = JSON.parse(json)._id;
    return produtor;
  }
}
