import api from "./api"

export async function listarSalas() {
    const response = await api.get("/Room")

    return response.data.dados
}

export async function ListarSalasPorId(id) {
    const response = await api.get(`/Room/${id}`)

    return response.data.dados
}