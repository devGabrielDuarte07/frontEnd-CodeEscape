import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resultadoPartida, start } from "../../services/gameSessionService";
import { useUser } from "../../context/UserContext";
import styles from "./final.module.css";

export default function Final() {
    const navigate = useNavigate();
    const { gameSessionId } = useParams();

    const [resultado, setResultado] = useState(null);
    const { usuario } = useUser();
    useEffect(() => {
        async function carregarResultado() {
            try {
                const data = await resultadoPartida(gameSessionId);
                
                setResultado(data);
            } catch (error) {
                console.error(
                    error.response?.data || error.message
                );
            }
        }

        carregarResultado();
    }, [gameSessionId]);

    function formatarTempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
    }

    async function startGame(id) {
        if (!usuario) {
            navigate("/login");
            return;
        }

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
    if (!resultado) {
        return (
            <div className={styles.loading}>
                <h1>Carregando resultado...</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    🎉
                </div>

                <h1 className={styles.title}>
                    Sala Concluída!
                </h1>

                <p className={styles.subtitle}>
                    Você escapou com sucesso.
                </p>

                <h2 className={styles.roomName}>
                    {resultado.nomeSala}
                </h2>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <span>⭐</span>
                        <div>
                            <h3>Pontuação</h3>
                            <p>{resultado.pontuacao}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <span>⏱</span>
                        <div>
                            <h3>Tempo</h3>
                            <p>{formatarTempo(resultado.tempoSegundos)}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <span>🏆</span>
                        <div>
                            <h3>Ranking</h3>
                            <p>#{resultado.melhorPosicaoRanking}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.homeButton}
                        onClick={() => navigate("/")}
                    >
                        Voltar para Home
                    </button>

                    <button
                        className={styles.playAgainButton}
                        onClick={() => startGame(resultado.codigoSala)}
                    >
                        Jogar Novamente
                    </button>
                </div>
            </div>
        </div>
    );
}