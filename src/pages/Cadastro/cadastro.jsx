import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../utils/toast";
import { UserPlus, Camera } from "lucide-react";
import { criarUsuario } from "../../services/usuarioService";
import { salvarAvatar } from "../../services/uploadService";
import { API_URL } from "../../services/api";
import styles from "./cadastro.module.css";

export default function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [preview, setPreview] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [enviandoAvatar, setEnviandoAvatar] = useState(false);
    const [criandoConta, setCriandoConta] = useState(false);

    async function handleAvatarChange(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setEnviandoAvatar(true);

        try {
            const avatar = await salvarAvatar(file);

            setAvatarUrl(avatar);
        }
        catch {
            setPreview(null);
            setAvatarUrl("");

            toast("error", "Erro ao enviar a imagem.");
        }
        finally {
            setEnviandoAvatar(false);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (enviandoAvatar) {
            return toast("warning", "Aguarde o envio da imagem.");
        }

        if (
            !nome ||
            !username ||
            !email ||
            !senha ||
            !confirmarSenha
        ) {
            return toast("warning", "Preencha todos os campos.");
        }

        if (senha !== confirmarSenha) {
            return toast("error", "As senhas não coincidem.");
        }

        const senhaValida =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(senha);

        if (!senhaValida) {
            return toast(
                "warning",
                "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial."
            );
        }

        const dados = {
            nome,
            username,
            email,
            senha,
            confirmarSenha,
            avatarUrl
        };

        try {
            setCriandoConta(true);

            await criarUsuario(dados);

            toast("success", "Conta criada com sucesso!");

            navigate("/login");
        }
        catch (error) {
            toast(
                "error",
                error?.response?.data?.mensagem ||
                "Não foi possível criar a conta."
            );
        }
        finally {
            setCriandoConta(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <UserPlus size={32} />
                    <h1>Criar Conta</h1>
                    <p>Entre para o CodeEscape</p>
                </div>

                <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper}>
                        <img
                            src={
                                preview ||
                                `${API_URL}/uploads/avatars/default.png`
                            }
                            alt="Avatar"
                            className={styles.avatar}
                        />

                        <label
                            htmlFor="avatar"
                            className={styles.cameraButton}
                        >
                            <Camera size={16} />
                        </label>

                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            hidden
                        />
                    </div>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                        value={confirmarSenha}
                        onChange={(e) =>
                            setConfirmarSenha(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={enviandoAvatar || criandoConta}
                    >
                        {enviandoAvatar
                            ? "Enviando imagem..."
                            : criandoConta
                                ? "Criando conta..."
                                : "Criar Conta"}
                    </button>
                </form>

                <p className={styles.loginText}>
                    Já possui uma conta?
                    <Link to="/login"> Entrar</Link>
                </p>
            </div>
        </div>
    );
}