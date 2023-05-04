import { Produto } from "./Produto";

export class ItemCompra{
    private _quantidade : number;
    private _produto : Produto;

    constructor(quantidade : number, produto : Produto){
        this._quantidade = quantidade;
        this._produto = produto;
    }

    set quantidade(quantidade : number){
        if(quantidade < 0)
            throw new Error("Quantidade inválida");
        this._quantidade = quantidade;
    }

    get quantidade(){
        return this._quantidade;
    }
    get produto(){
        return this._produto;
    }
}