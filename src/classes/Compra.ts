import { ItemCompra } from "./ItemCompra"
import { ListagemProduto } from "./ListagemProduto";

export class Compra{
    private _id: number;
    private _data: Date;
    private _cliente: string;
    private _telefone: string;
    private _endereco: string;
    private _itens: ListagemProduto[];
    private _formaPagamento: "" | "PICPAY" | "PIX" | "DINHEIRO";
    private _opcaoRecebimento: "" | "ENTREGA" | "SANTA_TERESA" | "PATRIMONIO" | "IFES";
    private _observacoes: string;
    private _doacao: number;
    private _valorTotal: number;
    private _taxaEntrega: number;
    
    constructor(id: number, data: Date, cliente: string, telefone: string, endereco: string, itens: ListagemProduto[], formaPagamento: "" | "PICPAY" | "PIX" | "DINHEIRO", opcaoRecebimento: "" |"ENTREGA" | "SANTA_TERESA" | "PATRIMONIO" | "IFES", observacoes: string, doacao: number, valorTotal: number, taxaEntrega: number){
        this._id = id;
        this._data = data;
        this._cliente = cliente;
        this._telefone = telefone;
        this._endereco = endereco;
        this._itens = itens;
        this._formaPagamento = formaPagamento;
        this._opcaoRecebimento = opcaoRecebimento;
        this._observacoes = observacoes;
        this._doacao = doacao;
        this._valorTotal = valorTotal;
        this._taxaEntrega = taxaEntrega;
    }
    
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get data(): Date {
        return this._data;
    }
    public set data(value: Date) {
        this._data = value;
    }
    public get cliente(): string {
        return this._cliente;
    }
    public set cliente(value: string) {
        this._cliente = value;
    }
    public get telefone(): string {
        return this._telefone;
    }
    public set telefone(value: string) {
        this._telefone = value;
    }
    public get endereco(): string {
        return this._endereco;
    }
    public set endereco(value: string) {
        this._endereco = value;
    }
    public get itens(): ListagemProduto[] {
        return this._itens;
    }
    public set itens(value: ListagemProduto[]) {
        this._itens = value;
    }
    public get formaPagamento(): "" | "PICPAY" | "PIX" | "DINHEIRO" {
        return this._formaPagamento;
    }
    public set formaPagamento(value: "" | "PICPAY" | "PIX" | "DINHEIRO") {
        this._formaPagamento = value;
    }
    public get opcaoRecebimento(): "" | "ENTREGA" | "SANTA_TERESA" | "PATRIMONIO" | "IFES" {
        return this._opcaoRecebimento;
    }
    public set opcaoRecebimento(value: "" | "ENTREGA" | "SANTA_TERESA" | "PATRIMONIO" | "IFES") {
        this._opcaoRecebimento = value;
    }
    public get observacoes(): string {
        return this._observacoes;
    }
    public set observacoes(value: string) {
        this._observacoes = value;
    }
    public get doacao(): number {
        return this._doacao;
    }
    public set doacao(value: number) {
        this._doacao = value;
    }
    public get valorTotal(): number {
        return this._valorTotal;
    }
    public set valorTotal(value: number) {
        this._valorTotal = value;
    }
    public get taxaEntrega(): number {
        return this._taxaEntrega;
    }
    public set taxaEntrega(value: number) {
        this._taxaEntrega = value;
    }
    
}