import { ItemCompra } from "./ItemCompra";
export class Carrinho{
    #itens : ItemCompra[];

    constructor(){
        this.#itens = [];
    }

    get itens(){
        return this.#itens;
    }

    adicionarItem(item : ItemCompra){
        if(item.quantidade < 0)
            throw new Error("Quantidade inválida");
        if(item.quantidade == 0)
            this.removerItem(item);
        else{
            let indice = this.#itens.findIndex(itemCarrinho => itemCarrinho.produto.id == item.produto.id);
            if(indice >= 0)
                this.#itens[indice] = item;
            else
                this.#itens.push(item);
        }
    }

    removerItem(item : ItemCompra){
        let indice = this.#itens.findIndex(itemCarrinho => itemCarrinho.produto.id == item.produto.id);
        if(indice >= 0)
            this.#itens.splice(indice, 1);
    }

    calcularTotal(){
        let total = 0;
        console.log(this.#itens);
        this.#itens.forEach(item => {
            total += item.produto.preco * item.quantidade;
        });
        return total;
    }
}