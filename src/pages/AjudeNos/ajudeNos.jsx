import { useEffect, useState } from "react";
import {
    HeartHandshake,
    Bug,
    Lightbulb,
    Palette,
    Gamepad2,
    Send,
    LoaderCircle
} from "lucide-react";
import Swal from "sweetalert2";

import Navbar from "../../components/NavBar/navBar";
import { enviarFeedback } from "../../services/feedbackService";
import { useUser } from "../../context/UserContext";

import styles from "./ajudeNos.module.css";

export default function AjudeNos() {
    const { usuario } = useUser();

    const [form, setForm] = useState({
        nome: "",
        email: "",
        categoria: "",
        mensagem: "",
    });

    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (!usuario) return;

        setForm((prev) => ({
            ...prev,
            nome: usuario.nome ?? "",
            email: usuario.email ?? "",
        }));
    }, [usuario]);

    function alterarCampo(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.categoria) {
            Swal.fire({
                icon: "warning",
                title: "Categoria obrigatória",
                text: "Selecione uma categoria.",
                confirmButtonColor: "#7c3aed",
                background: "#1f1b2e",
                color: "#fff",
            });

            return;
        }

        if (!form.mensagem.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Mensagem obrigatória",
                text: "Digite sua mensagem.",
                confirmButtonColor: "#7c3aed",
                background: "#1f1b2e",
                color: "#fff",
            });

            return;
        }

        try {
            setEnviando(true);

            const resultado = await enviarFeedback(form);

            Swal.fire({
                icon: "success",
                title: "Feedback enviado!",
                text: resultado.mensagem,
                confirmButtonColor: "#7c3aed",
                background: "#1f1b2e",
                color: "#fff",
            });

            setForm({
                nome: usuario?.nome ?? "",
                email: usuario?.email ?? "",
                categoria: "",
                mensagem: "",
            });
        }
        catch (erro) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text:
                    erro.response?.data?.mensagem ??
                    erro.message ??
                    "Não foi possível enviar seu feedback.",
                confirmButtonColor: "#7c3aed",
                background: "#1f1b2e",
                color: "#fff",
            });
        }
        finally {
            setEnviando(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.card}>

                    <div className={styles.header}>
                        <div className={styles.icon}>
                            <HeartHandshake size={40} />
                        </div>

                        <h1>Ajude-nos a melhorar o CodeEscape</h1>

                        <p>
                            O CodeEscape ainda está em desenvolvimento.
                            Sua opinião é muito importante para tornar o jogo
                            cada vez melhor. Encontrou um bug? Tem uma ideia
                            para uma nova sala? Quer sugerir alguma melhoria?
                            Conte para nós!
                        </p>
                    </div>

                    <div className={styles.infoGrid}>

                        <div className={styles.infoCard}>
                            <Bug size={30} />
                            <h3>Encontrou um Bug?</h3>
                            <p>
                                Relate qualquer problema encontrado durante a
                                jogatina para que possamos corrigir o mais
                                rápido possível.
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <Lightbulb size={30} />
                            <h3>Novas Ideias</h3>
                            <p>
                                Sugira novos enigmas, mecânicas, desafios ou
                                funcionalidades para deixar o jogo ainda mais
                                divertido.
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <Palette size={30} />
                            <h3>Interface</h3>
                            <p>
                                Achou alguma tela confusa? Tem alguma ideia
                                para melhorar o visual ou a navegação?
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <Gamepad2 size={30} />
                            <h3>Experiência</h3>
                            <p>
                                Conte como foi sua experiência jogando o
                                CodeEscape e o que faria você voltar a jogar.
                            </p>
                        </div>

                    </div>

                    <div className={styles.timeline}>

                        <h2>Projeto em Desenvolvimento 🚧</h2>

                        <div className={styles.timelineGrid}>

                            <div className={styles.done}>
                                <h4>Já disponível</h4>

                                <ul>
                                    <li>✔ Sistema de Ranking</li>
                                    <li>✔ Perfil do Jogador</li>
                                    <li>✔ Sistema de Dicas</li>
                                    <li>✔ Avatar Personalizado</li>
                                </ul>
                            </div>

                            <div className={styles.todo}>
                                <h4>Em breve</h4>

                                <ul>
                                    <li>🚧 Criador de Salas</li>
                                    <li>🚧 Sistema de Conquistas</li>
                                    <li>🚧 Novos Enigmas</li>
                                    <li>🚧 Mais Personalizações</li>
                                </ul>
                            </div>

                        </div>

                    </div>

                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >

                        <h2>Enviar Feedback</h2>

                        {usuario && (
                            <div className={styles.loggedInfo}>
                                💜 Seu nome e e-mail foram preenchidos automaticamente.
                                Você pode alterá-los antes de enviar, se desejar.
                            </div>
                        )}

                        <input
                            type="text"
                            name="nome"
                            placeholder={
                                usuario
                                    ? "Nome (preenchido automaticamente)"
                                    : "Nome (opcional)"
                            }
                            value={form.nome}
                            onChange={alterarCampo}
                            disabled={enviando}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder={
                                usuario
                                    ? "E-mail (preenchido automaticamente)"
                                    : "E-mail (opcional)"
                            }
                            value={form.email}
                            onChange={alterarCampo}
                            disabled={enviando}
                        />

                        <select
                            name="categoria"
                            value={form.categoria}
                            onChange={alterarCampo}
                            disabled={enviando}
                        >
                            <option value="">
                                Selecione uma categoria
                            </option>

                            <option value="Bug">🐞 Bug</option>
                            <option value="Sugestão">💡 Sugestão</option>
                            <option value="Nova Sala">🚪 Nova Sala</option>
                            <option value="Novo Enigma">🧩 Novo Enigma</option>
                            <option value="Interface">🎨 Interface</option>
                            <option value="Outro">📩 Outro</option>
                        </select>

                        <div className={styles.textareaContainer}>
                            <textarea
                                name="mensagem"
                                rows={7}
                                placeholder="Escreva aqui sua sugestão, crítica ou ideia..."
                                value={form.mensagem}
                                onChange={alterarCampo}
                                disabled={enviando}
                                maxLength={1000}
                            />

                            <span className={styles.counter}>
                                {form.mensagem.length}/1000
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={enviando}
                        >
                            {enviando ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className={styles.spinner}
                                    />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Enviar Feedback
                                </>
                            )}
                        </button>

                    </form>

                </div>
            </div>
        </>
    );
}