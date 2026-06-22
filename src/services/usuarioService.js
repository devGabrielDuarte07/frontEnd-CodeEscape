import api from "./api";

export async function criarUsuario(dados) {
    const response = await api.post("/Usuario", dados);

    return response.data.dados;
}


export async function obterPerfil() {
    const response = await api.get("/Usuario/perfil");

    return response.data.dados;
}