import { useEffect, useState } from "react";
import { listarSalas } from "../../services/roomService";
import { API_URL } from "../../services/api"
import { useNavigate } from "react-router-dom";
import RoomCard from "../../components/RoomCards/roomCard";
export default function Home() {
    const [salas, setSalas] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function carregarSalas() {
            const data = await listarSalas();

            console.log(data)

            setSalas(data)
        }

        carregarSalas();
    }, [])

    return (
        <>
            <h1>Salas</h1>

            {salas.map(sala => (
                <RoomCard 
                    key={sala.id}
                    sala={sala}
                    apiUrl={API_URL}
                />
            ))}
        </>
    );
}