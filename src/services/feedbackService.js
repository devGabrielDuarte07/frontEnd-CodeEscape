import api from "./api"


export async function enviarFeedback(dados) {
    const response = await api.post("/Feedback", dados);

    return response.data
}