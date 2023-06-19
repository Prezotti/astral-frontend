export class ListagemProduto{
    private _produto: string;
    private _produtor: string;
    private _quantidade: number;

    constructor(produto: string, produtor: string, quantidade: number){
        this._produto = produto;
        this._produtor = produtor;
        this._quantidade = quantidade;
    }

    public get produto(): string {
        return this._produto;
    }
    public set produto(value: string) {
        this._produto = value;
    }
    public get produtor(): string {
        return this._produtor;
    }
    public set produtor(value: string) {
        this._produtor = value;
    }
    public get quantidade(): number {
        return this._quantidade;
    }
    public set quantidade(value: number) {
        this._quantidade = value;
    }
}