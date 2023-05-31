export interface InformacoesCompra {
    valorDoacao: number;
    nome: string;
    telefone: string;
    formaPagamento: "" | "PICPAY" | "PIX" | "DINHEIRO";
    localEntrega: "" |"ENTREGA" | "SANTA_TERESA" | "PATRIMONIO" | "IFES";
    observacoes: string;
}

export interface Endereco{
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    referencia: string;
}
