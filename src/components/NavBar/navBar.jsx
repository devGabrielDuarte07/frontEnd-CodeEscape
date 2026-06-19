import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, Lock, ChevronDown, LogOut, UserCircle } from "lucide-react";

import { obterPerfil } from "../../services/usuarioService";

import styles from "./navBar.module.css";

export default function NavBar() {
    const token = localStorage.getItem("token");

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [menuAberto, setMenuAberto] = useState(false);

    const navigate = useNavigate();

    async function carregarUsuario() {
        try {
            const dados = await obterPerfil();
            setNomeUsuario(dados.nome);
        } catch (error) {
            console.error(error);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        if (token) {
            carregarUsuario();
        }
    }, [token]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Lock />
                <span>Code Escape</span>
            </div>

            <div className={styles.links}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles.active : styles.link
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/como-funciona"
                    className={({ isActive }) =>
                        isActive ? styles.active : styles.link
                    }
                >
                    Como funciona
                </NavLink>

                <NavLink
                    to="/desenvolvedor"
                    className={({ isActive }) =>
                        isActive ? styles.active : styles.link
                    }
                >
                    Desenvolvedor
                </NavLink>
            </div>

            {token ? (
                <div className={styles.userContainer}>
                    <button
                        className={styles.user}
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        <User />
                        <span>{nomeUsuario || "Perfil"}</span>
                        <ChevronDown size={16} />
                    </button>

                    {menuAberto && (
                        <div className={styles.dropdown}>
                            <button
                                onClick={() => {
                                    navigate("/perfil");
                                    setMenuAberto(false);
                                }}
                            >
                                <UserCircle size={18} />
                                Meu Perfil
                            </button>

                            <button onClick={logout}>
                                <LogOut size={18} />
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.authButtons}>
                    <button
                        className={styles.loginButton}
                        onClick={() => navigate("/login")}
                    >
                        Entrar
                    </button>

                    <button
                        className={styles.registerButton}
                        onClick={() => navigate("/register")}
                    >
                        Criar Conta
                    </button>
                </div>
            )}
        </nav>
    );
}