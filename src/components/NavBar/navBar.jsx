import { NavLink, useNavigate } from "react-router-dom";
import { Lock, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { API_URL } from "../../services/api";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import styles from "./navBar.module.css";

export default function NavBar() {

    const [menuAberto, setMenuAberto] = useState(false);

    const navigate = useNavigate();
    const { usuario, logout: logoutContext } = useUser();

    function logout() {
        setMenuAberto(false);
        logoutContext();
        navigate("/login");
    }

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

                <NavLink
                    to="/ajude-nos"
                    className={({ isActive }) =>
                        isActive ? styles.active : styles.link
                    }>
                    Ajude-nos
                </NavLink>

            </div>

            {usuario ? (
                <div className={styles.userContainer}>
                    <button
                        className={styles.user}
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        <img
                            src={`${API_URL}${usuario.avatarUrl || "/uploads/avatars/default.png"}`}
                            alt={usuario.nome}
                            className={styles.avatar}
                        />

                        <span>{usuario.nome}</span>

                        <ChevronDown
                            size={16}
                            className={
                                menuAberto
                                    ? styles.chevronOpen
                                    : styles.chevron
                            }
                        />
                    </button>

                    {menuAberto && (
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>
                                <img
                                    src={`${API_URL}${usuario.avatarUrl || "/uploads/avatars/default.png"}`}
                                    alt={usuario.nome}
                                    className={styles.dropdownAvatar}
                                />

                                <strong>{usuario.nome}</strong>

                                <span>{usuario.email}</span>
                            </div>
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
                        onClick={() => navigate("/cadastro")}
                    >
                        Criar Conta
                    </button>
                </div>
            )}
        </nav>
    );
}