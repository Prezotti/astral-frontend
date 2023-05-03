import { Produto } from "./Produto";

export class ItemCompra{
    #quantidade : number;
    #produto : Produto;

    constructor(quantidade : number, produto : Produto){
        this.#quantidade = quantidade;
        this.#produto = produto;
    }

    set quantidade(quantidade : number){
        if(quantidade < 0)
            throw new Error("Quantidade inválida");
        this.#quantidade = quantidade;
    }

    get quantidade(){
        return this.#quantidade;
    }
    get produto(){
        return this.#produto;
    }
}