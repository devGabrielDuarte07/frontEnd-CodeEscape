import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ListarSalasPorId } from "../../services/roomService";
import { rankingSala } from "../../services/rankingService";
import { start } from "../../services/gameSessionService";
import { API_URL } from "../../services/api";
import { useUser } from "../../context/UserContext";
import NavBar from "../../components/NavBar/navBar";

import styles from "./roomDetails.module.css";

export default function RoomDetails() {
    const { id } = useParams();
    const [sala, setSala] = useState(null);
    const [ranking, setRanking] = useState([]);

    const navigate = useNavigate();
    const { usuario } = useUser();
    function formatarTempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
    }

    function obterPosicao(index) {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";

        return `#${index + 1}`;
    }

    async function startGame(id) {
        try {
            const data = await start(id);

            navigate(`/game/${data.gameSessionId}`);
        } catch (error) {
            console.error(
                "Erro ao iniciar partida:",
                error.response?.data || error.message
            );
        }
    }

    useEffect(() => {
        async function carregarDados() {
            try {
                const [salaData, rankingData] = await Promise.all([
                    ListarSalasPorId(id),
                    rankingSala(id)
                ]);
                
                setSala(salaData);
                setRanking(rankingData);
                console.log(salaData)
            } catch (error) {
                console.error(error);
            }
        }

        carregarDados();
    }, [id]);

    if (!sala) {
        return (
            <>
                <NavBar />
                <div className={styles.loading}>
                    <h1>Carregando sala...</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className={styles.container}>
                <div className={styles.details}>
                    <img
                        className={styles.roomImage}
                        src={`${API_URL}/${sala.capaUrl}`}
                        alt={sala.nome}
                    />

                    <h1 className={styles.title}>
                        {sala.nome}
                    </h1>

                    <p className={styles.description}>
                        {sala.descricao}
                    </p>

                    <div className={styles.info}>
                        <div className={styles.infoCard}>
                            🧩 {sala.quantidadeEnigma} enigmas
                        </div>

                        <div className={styles.infoCard}>
                            ⭐ {sala.dificuldade}
                        </div>

                        <div className={styles.infoCard}>
                            👥 {ranking.length} jogadores
                        </div>
                    </div>

                    {usuario ? (
                        <button
                            className={styles.startButton}
                            onClick={() => startGame(id)}
                        >
                            Iniciar Partida
                        </button>
                    ) : (
                        <button
                            className={styles.startButton}
                            onClick={() => navigate("/login")}
                        >
                            Fazer Login para Jogar
                        </button>
                    )}
                </div>

                <div className={styles.ranking}>
                    <h2>🏆 Ranking</h2>

                    {ranking.length === 0 && (
                        <p className={styles.emptyRanking}>
                            Nenhum jogador completou esta sala ainda.
                        </p>
                    )}

                    {ranking.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.rankingItem}
                                ${index === 0 ? styles.gold : ""}
                                ${index === 1 ? styles.silver : ""}
                                ${index === 2 ? styles.bronze : ""}
                            `}
                        >
                            <div className={styles.position}>
                                {obterPosicao(index)}
                            </div>

                            <img
                                className={styles.avatar}
                                src={`${API_URL}${item.avatarUrl}`}
                                alt={item.usuario}
                            />

                            <div className={styles.playerInfo}>
                                <h4>{item.usuario}</h4>

                                <p>
                                    {item.pontuacao} pts
                                </p>

                                <p>
                                    {formatarTempo(item.tempoSegundos)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}