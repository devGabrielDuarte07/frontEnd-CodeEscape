import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

import { login } from "../../services/authService";
import { useUser } from "../../context/UserContext";
import { toast } from "../../utils/toast";

import styles from "./login.module.css";

export default function Login() {
    const navigate = useNavigate();
    const { carregarUsuario } = useUser();

    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [enviando, setEnviando] = useState(false);

    async function fazerLogin(e) {
        e.preventDefault();

        if (!user.trim() || !senha) {
            toast("warning", "Preencha todos os campos.");
            return;
        }

        setEnviando(true);

        try {
            const token = await login(user.trim(), senha);

            localStorage.setItem("token", token);

            await carregarUsuario();

            toast("success", "Login realizado com sucesso!");

            navigate("/");
        } catch (error) {
            console.error(
                "Erro ao fazer login:",
                error.response?.data || error.message
            );

            toast(
                "error",
                error?.response?.data?.mensagem ||
                    "Usuário ou senha inválidos."
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={fazerLogin} className={styles.container}>
            <div className={styles.logo}>
                <Lock size={70} />
                <h1>CODE ESCAPE</h1>
                <p>Resolva enigmas. Fuja da sala. Prove seu código.</p>
            </div>

            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Login</h1>
                    <p>Entre na sua conta para continuar</p>
                </div>

                <div className={styles.formGroup}>
                    <label>Email ou Username</label>

                    <input
                        type="text"
                        value={user}
                        disabled={enviando}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Senha</label>

                    <input
                        type="password"
                        value={senha}
                        disabled={enviando}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.button}
                    disabled={enviando}
                >
                    {enviando ? "Entrando..." : "Entrar"}
                </button>

                <p className={styles.forgotPassword}>
                    Esqueceu sua senha?
                </p>

                <div className={styles.separator}>
                    ou
                </div>

                <button
                    type="button"
                    className={styles.registerButton}
                    disabled={enviando}
                    onClick={() => navigate("/cadastro")}
                >
                    Criar conta
                </button>

                <button
                    type="button"
                    className={styles.backButton}
                    disabled={enviando}
                    onClick={() => navigate("/")}
                >
                    ← Voltar para Home
                </button>
            </div>
        </form>
    );
}