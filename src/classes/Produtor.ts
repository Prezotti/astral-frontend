export class Produtor{
    #nome : string;
    #disponivel : boolean;
    #telefone : string;
    #id: number;

    constructor(nome : string, disponivel : boolean, telefone : string, id : number){
        this.#nome = nome;
        this.#disponivel = disponivel;
        this.#telefone = telefone;
        this.#id = id;
    }

    get nome(){
        return this.#nome;
    }
    get disponivel(){
        return this.#disponivel;
    }
    get telefone(){
        return this.#telefone;
    }
    get id(){
        return this.#id;
    }


}