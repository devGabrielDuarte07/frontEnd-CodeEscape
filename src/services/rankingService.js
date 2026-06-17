import api from "./api";

export async function rankingSala(id) {
     const response = await api.get(`/Ranking/sala/${id}`)

    return response.data.dados
}