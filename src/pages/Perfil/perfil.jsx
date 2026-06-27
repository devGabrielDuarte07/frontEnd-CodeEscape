import { useState } from "react";
import { Trophy, Puzzle, Star, Clock3, UserPen } from "lucide-react";
import { API_URL } from "../../services/api";
import NavBar from "../../components/NavBar/navBar";
import styles from "./perfil.module.css";
import { Camera } from "lucide-react";
import { salvarAvatar } from "../../services/uploadService";
import { atualizarAvatar } from "../../services/usuarioService";
import { useUser } from "../../context/UserContext";
import { toast } from "../../utils/toast";

export default function Perfil() {
    const { usuario, carregarUsuario } = useUser();

    const perfil = usuario;
    const [enviandoAvatar, setEnviandoAvatar] = useState(false);

    async function handleAvatarChange(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        setEnviandoAvatar(true);

        try {
            // Faz upload da imagem
            const novaUrl = await salvarAvatar(file);

            // Atualiza no banco
            await atualizarAvatar(novaUrl);

            await carregarUsuario();
        }
        catch (error) {
            toast(
                "error",
                error?.response?.data?.mensagem ||
                "Não foi possível atualizar o avatar."
            );
        }
        finally {
            setEnviandoAvatar(false);
        }
    }

    function formatarTempo(segundos) {
        if (!segundos) return "--:--";

        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        return `${String(minutos).padStart(2, "0")}:${String(
            segundosRestantes
        ).padStart(2, "0")}`;
    }

    if (!perfil) {
        return (
            <div className={styles.loading}>
                <h2>Carregando perfil...</h2>
            </div>
        );
    }

    return (
        <>
            <NavBar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Meu Perfil</h1>
                    <p>Acompanhe seu progresso no Code Escape</p>
                </div>

                <div className={styles.profileCard}>
                    <div className={styles.avatarWrapper}>
                        <img
                            src={`${API_URL}${perfil.avatarUrl}`}
                            alt={perfil.nome}
                            className={styles.avatar}
                        />

                        <div className={styles.cameraBadge}>
                            <Camera size={20} />
                        </div>
                        <label
                            htmlFor="avatar"
                            className={styles.avatarOverlay}
                        >
                            {enviandoAvatar ? (
                                <span>Enviando...</span>
                            ) : (
                                <>
                                    <Camera size={22} />
                                    <span>Alterar</span>
                                </>
                            )}
                        </label>

                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            hidden
                            disabled={enviandoAvatar}

                            onChange={handleAvatarChange}
                        />
                    </div>

                    <div className={styles.userInfo}>
                        <h2>{perfil.nome}</h2>
                        <span>@{perfil.username}</span>
                        <p>{perfil.email}</p>

                        <small>
                            Membro desde{" "}
                            {new Date(
                                perfil.dataCadastro
                            ).toLocaleDateString("pt-BR")}
                        </small>
                    </div>

                    <button className={styles.editButton}>
                        <UserPen size={18} />
                        Editar Perfil
                    </button>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <Trophy size={28} />
                        <h2>{perfil.salasConcluidas}</h2>
                        <p>Salas Concluídas</p>
                    </div>

                    <div className={styles.statCard}>
                        <Puzzle size={28} />
                        <h2>{perfil.enigmasResolvidos}</h2>
                        <p>Enigmas Resolvidos</p>
                    </div>

                    <div className={styles.statCard}>
                        <Star size={28} />
                        <h2>{perfil.pontuacaoTotal}</h2>
                        <p>Pontuação Total</p>
                    </div>

                    <div className={styles.statCard}>
                        <Clock3 size={28} />
                        <h2>{formatarTempo(perfil.melhorTempo)}</h2>
                        <p>Recorde Pessoal</p>
                    </div>
                </div>

                <div className={styles.favoriteRoom}>
                    <h2>🏆 Sala Mais Jogada</h2>

                    <div className={styles.roomCard}>
                        <h3>
                            {perfil.salaMaisJogada ??
                                "Nenhuma sala concluída"}
                        </h3>

                        <div className={styles.roomInfo}>
                            <div>
                                <span>Melhor Tempo</span>
                                <strong>
                                    {formatarTempo(perfil.melhorTempo)}
                                </strong>
                            </div>

                            <div>
                                <span>Pontuação Total</span>
                                <strong>{perfil.pontuacaoTotal}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}