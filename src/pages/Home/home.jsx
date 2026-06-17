import { useEffect, useState } from "react";
import { listarSalas } from "../../services/roomService";
import { API_URL } from "../../services/api"
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css"
import RoomCard from "../../components/RoomCards/roomCard";
import NavBar from "../../components/NavBar/navBar";

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
            <NavBar />

            <div className={styles.container}>
                <div className={styles.main}>

                    <div className={styles.hero}>
                        <h1>
                            Bem-vindo ao <span>CodeEscape!</span>
                        </h1>

                        <p>
                            Escolha sua próxima aventura e teste suas habilidades.
                        </p>
                    </div>

                    <div className={styles.containerCards}>
                        {salas.map(sala => (
                            <RoomCard
                                key={sala.id}
                                sala={sala}
                                apiUrl={API_URL}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}