export class Produtor{
    private _nome : string;
    private _disponivel : boolean;
    private _telefone : string;
    private _id: number;

    constructor(nome : string, disponivel : boolean, telefone : string, id : number){
        this._nome = nome;
        this._disponivel = disponivel;
        this._telefone = telefone;
        this._id = id;
    }

    get nome(){
        return this._nome;
    }
    get disponivel(){
        return this._disponivel;
    }
    get telefone(){
        return this._telefone;
    }
    get id(){
        return this._id;
    }

    toJson(){
        return JSON.stringify(this);
    }

    fromJSON(json : string){
        let produtor = new Produtor("", false, "", 0);
        produtor._nome = JSON.parse(json)._nome;
        produtor._disponivel = JSON.parse(json)._disponivel;
        produtor._telefone = JSON.parse(json)._telefone;
        produtor._id = JSON.parse(json)._id;
        return produtor;
    }


}