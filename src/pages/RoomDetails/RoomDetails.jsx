import { useEffect, useState } from "react";
import { ListarSalasPorId } from "../../services/roomService";
import { API_URL } from "../../services/api"
import { useParams } from "react-router-dom";
import { start } from "../../services/gameSessionService";
import { useNavigate } from "react-router-dom";

export default function RoomDetails() {
    const { id } = useParams()
    const [sala, setSala] = useState(null)
    const navigate = useNavigate()


    async function startGame(id) {
        try {
            const data = await start(id);

            navigate(`/game/${data.gameSessionId}`)

            console.log(data)
        } catch (error) {
            console.error(
                'Erro ao fazer login:',
                error.response?.data || error.message
            )
        }
    }

    useEffect(() => {
        async function carregarSala(id) {
            const data = await ListarSalasPorId(id)

            console.log(data)

            setSala(data)

        }

        carregarSala(id)
    }, [id])

    if (sala == null) {
        return (
            <>
                <h1>sala carregando</h1>
            </>)
    }
    return (
        <>
            <div key={sala.id}>
                <img src={`${API_URL}/${sala.capaUrl}`} alt={sala.nome} />
                <h3>{sala.nome}</h3>
                <p>{sala.descricao}</p>
                <p>{sala.quantidadeEnigmas}</p>
                <p>{sala.dificuldade}</p>
                <button onClick={() => startGame(id)}>Iniciar partida</button>
            </div>
        </>
    );
}


