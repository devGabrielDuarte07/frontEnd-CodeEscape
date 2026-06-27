import api from "./api";

export async function salvarAvatar(file) {
    const formData = new FormData();

    formData.append("arquivo", file);

    const response = await api.post("/Upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data.dados;
}