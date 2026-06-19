import api from "./api";




export async function obterPerfil() {
    const response = await api.get("/Usuario/perfil");
    
    return response.data.dados;
}