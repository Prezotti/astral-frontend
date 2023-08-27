import { ItemCompra } from "./ItemCompra";
import { Produto } from "./Produto";
import { Produtor } from "./Produtor";
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

    getQtdItem(id: number){
        let indice = this._itens.findIndex(itemCarrinho => itemCarrinho.produto.id == id);
        if(indice >= 0)
            return this._itens[indice].quantidade;
        else
            return 0;
    }

    removerItem(item : ItemCompra){
        let indice = this._itens.findIndex(itemCarrinho => itemCarrinho.produto.id == item.produto.id);
        if(indice >= 0)
            this._itens.splice(indice, 1);
    }

    qtdProdutos(){
        return this._itens.length;
    }

    calcularTotal(){
        let total = 0;
        this._itens.forEach(item => {
            total += item.produto.preco * item.quantidade;
        });
        return total;
    }

    toJson(){
        return JSON.stringify(this);
    }
    
    fromJSON(json : string){
        let carrinho = new Carrinho();
        let itens = JSON.parse(json)._itens;
        itens.forEach((item : string) => {
            let produtor = new Produtor("", false, "", "", 0);
            let produto = new Produto("", 0, "", produtor, 0, "", "", 0, false);
            let itemCompra = new ItemCompra(0, produto)
            itemCompra = itemCompra.fromJSON(JSON.stringify(item));
            carrinho.adicionarItem(itemCompra);
        });
       
        return carrinho;
    }
    
}