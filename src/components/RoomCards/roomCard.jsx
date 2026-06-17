import { useNavigate } from "react-router-dom";

export default function RoomCard({ sala, apiUrl }) {
    const navigate = useNavigate

    return (
        <div>
            <img
                src={`${apiUrl}/${sala.capaUrl}`}
                alt={sala.nome}
                
                
            />
            <p>{sala.dificuldade}</p>
            <p>{sala.dificuldade}</p>
            <h3>{sala.nome}</h3>
            <p>{sala.descricao}</p>
            <p>{sala.quantidadeEnigmas}</p>
            

            <button onClick={() => navigate(`/room/${sala.id}`)}>
                Jogar
            </button>
        </div>
    )
}