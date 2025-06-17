import axios from 'axios';

export interface VoucherRequest {
    cpf: string;
    email: string;
}

export interface VoucherResponse {
    id: number;
    cpf: string;
    email: string;
    code: string;
    date: string;
}

// Função para chamar a API e gerar o voucher
export const gerarVoucher = async (voucher: VoucherRequest): Promise<VoucherResponse> => {
    const response = await axios.post('http://localhost:8081/vouchers/generate', voucher);
    return response.data;
};
