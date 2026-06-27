import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Lightbulb } from "lucide-react";
import Swal from "sweetalert2";
import {
    obterEnigmaAtual,
    responder,
    obterDica
} from "../../services/gameSessionService";

import styles from "./game.module.css";

export default function Game() {
    const navigate = useNavigate();

    const { gameSessionId } = useParams();
    const inputRef = useRef(null);
    const [enigma, setEnigma] = useState(null);
    const [resposta, setResposta] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [dica, setDica] = useState("")

    async function buscarDica() {
        setErro("");

        try {
            const resultado = await obterDica(gameSessionId);

            setDica(resultado.dica);
        }
        catch (error) {
            console.error(
                error.response?.data || error.message
            );

            setErro(
                error.response?.data?.mensagem ||
                "Não foi possível obter a dica."
            );
        }
    }
    async function abrirModalDica() {
        const result = await Swal.fire({
            title: "Utilizar dica?",
            text: "Você perderá 25 pontos ao revelar a dica.",
            icon: "warning",

            background: "#141414",
            color: "#fff",

            confirmButtonText: "Usar dica",
            cancelButtonText: "Cancelar",

            showCancelButton: true,

            confirmButtonColor: "#f97316",
            cancelButtonColor: "#2a2a2a"
        });

        if (!result.isConfirmed)
            return;

        await buscarDica();
    }
    useEffect(() => {
        async function carregarEnigma() {
            try {
                const data = await obterEnigmaAtual(gameSessionId);

                setEnigma(data);
                setDica("");
            } catch (error) {
                console.error(
                    error.response?.data || error.message
                );
            } finally {
                setCarregando(false);
            }
        }

        carregarEnigma();
    }, [gameSessionId]);
    useEffect(() => {
        inputRef.current?.focus();
    }, [enigma]);
    async function responderEnigma(e) {
        e.preventDefault();

        setErro("");

        try {
            setEnviando(true);
            const data = await responder(
                gameSessionId,
                resposta
            );

            if (!data.acertou) {
                setErro("Resposta incorreta. Tente novamente.");
                setResposta("");
                return;
            }

            if (data.finalizada) {
                navigate(`/game/${gameSessionId}/finalizada`);
                return;
            }

            const novoEnigma =
                await obterEnigmaAtual(gameSessionId);

            setResposta("");
            setErro("");
            setDica("");
            setEnigma(novoEnigma);
        }
        catch (error) {
            console.error(
                error.response?.data || error.message
            );

            setErro(
                "Ocorreu um erro ao enviar sua resposta."
            );
        } finally {
            setEnviando(false);
        }
    }

    if (carregando) {
        return (
            <div className={styles.loading}>
                Carregando enigma...
            </div>
        );
    }

    if (!enigma) {
        return (
            <div className={styles.loading}>
                Não foi possível carregar o enigma.
            </div>
        );
    }

    return (
        <div className={styles.gameContainer}>
            <form
                className={styles.gameCard}
                onSubmit={responderEnigma}
            >
                <div className={styles.topInfo}>
                    <span className={styles.badge}>
                        Enigma {enigma.ordem} de {enigma.totalEnigmas}
                    </span>

                    {!dica ? (
                        <button
                            type="button"
                            onClick={abrirModalDica}
                            className={styles.dicaButton}
                        >
                            <Lightbulb size={18} />
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className={styles.dicaButton}
                            title="Dica utilizada"
                        >
                            <Lightbulb size={18} />
                        </button>
                    )}
                </div>

                <div className={styles.progress}>
                    <div
                        className={styles.progressBar}
                        style={{
                            width: `${(enigma.ordem / enigma.totalEnigmas) * 100}%`
                        }}
                    />
                </div>

                <p className={styles.progressText}>
                    {Math.round(
                        (enigma.ordem / enigma.totalEnigmas) * 100
                    )}
                    % concluído
                </p>

                <h1 className={styles.title}>
                    {enigma.titulo}
                </h1>

                <p className={styles.question}>
                    {enigma.pergunta}
                </p>

                {dica && (
                    <div className={styles.dicaBox}>
                        <h3>💡 Dica</h3>
                        <p>{dica}</p>
                    </div>
                )}

                <input
                    className={styles.input}
                    type="text"
                    required
                    maxLength={100}
                    ref={inputRef}
                    disabled={enviando}
                    autoComplete="off"
                    value={resposta}
                    onChange={(e) =>
                        setResposta(e.target.value)
                    }
                    placeholder="Digite sua resposta e pressione Enter"
                />

                {erro && (
                    <p className={styles.error}>
                        {erro}
                    </p>
                )}

                <button
                    disabled={enviando}
                    className={styles.button}
                    type="submit"
                >
                    {enviando
                        ? "Verificando..."
                        : "Responder"}
                </button>
            </form>
        </div>
    );
}