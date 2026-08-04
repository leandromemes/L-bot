import axios from 'axios';

export const consultarCPF = async (cpf) => {
    try {
        // API de Ferramentas (Pública/Grátis)
        const { data } = await axios.get(`https://api.vreden.my.id/api/tools/check-cpf?number=${cpf}`);
        if (data.status === 200) return data.result;
        return null;
    } catch (err) {
        console.error("Erro API CPF:", err.message);
        return null;
    }
};

export const consultarCNPJ = async (cnpj) => {
    try {
        const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        return data;
    } catch { return null; }
};

export const consultarCEP = async (cep) => {
    try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return data.erro ? null : data;
    } catch { return null; }
};