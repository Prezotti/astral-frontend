import { ItemCompra } from "./ItemCompra";
export class Carrinho{
    private _itens : ItemCompra[];

    constructor(){
        this._itens = [];
    }

    get itens(){
        return this._itens;
    }

    adicionarItem(item : ItemCompra){
        if(item.quantidade < 0)
            throw new Error("Quantidade inválida");
        if(item.quantidade == 0)
            this.removerItem(item);
        else{
            let indice = this._itens.findIndex(itemCarrinho => itemCarrinho.produto.id == item.produto.id);
            if(indice >= 0)
                this._itens[indice] = item;
            else
                this._itens.push(item);
        }
    }

    removerItem(item : ItemCompra){
        let indice = this._itens.findIndex(itemCarrinho => itemCarrinho.produto.id == item.produto.id);
        if(indice >= 0)
            this._itens.splice(indice, 1);
    }

    calcularTotal(){
        let total = 0;
        console.log(this._itens);
        this._itens.forEach(item => {
            total += item.produto.preco * item.quantidade;
        });
        return total;
    }
}