import api from "./api"

export async function login(login, senha) {
    const response = await api.post('/Login', { login, senha })

    return response.data.dados
}