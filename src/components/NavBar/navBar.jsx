import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";

import { User, Lock } from "lucide-react";

export default function NavBar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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

                {token && (
                    <NavLink
                        to="/perfil"
                        className={({ isActive }) =>
                            isActive ? styles.active : styles.link
                        }
                    >
                        Perfil
                    </NavLink>
                )}
            </div>

            {token ? (
                <div
                    className={styles.user}
                    onClick={() => navigate("/perfil")}
                >
                    <User />
                    <span>Meu Perfil</span>
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