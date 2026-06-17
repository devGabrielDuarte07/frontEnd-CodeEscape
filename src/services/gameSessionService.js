import api from "./api";

export async function start(roomId) {
    const response = await api.post("/GameSessions/Start", { roomId })

    return response.data.dados
}

export async function obterEnigmaAtual(id) {
    const response = await api.post(`/GameSessions/${id}/enigma-atual`)

    return response.data.dados
}

export async function responder(id, resposta) {
    const response = await api.post(`/GameSessions/${id}/Responder`, { resposta })

    return response.data.dados
}