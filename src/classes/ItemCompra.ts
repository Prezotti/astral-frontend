import { Produto } from "./Produto";
import { Produtor } from "./Produtor";

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

    toItemCarrinho(){
        return {
            produtoId: this._produto.id,
            quantidade: this._quantidade
        }
    }

    toJson(){
        return JSON.stringify(this);
    }

    fromJSON(json : string){
        let produtor = new Produtor("", false, "", 0);
        let produto = new Produto("", 0, "", produtor, 0, "", "", 0, false);
        produto = produto.fromJSON(JSON.stringify(JSON.parse(json)._produto));

        let item = new ItemCompra(0, produto);

        item._quantidade = JSON.parse(json)._quantidade;
        return item;
    }


    
}