import { useState } from "react"
import { login } from "../../services/authService"
import { useNavigate, Link } from "react-router-dom"
import { Lock } from "lucide-react";
import styles from "./login.module.css";

export default function Login() {

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [senha, setSenha] = useState('')

    async function fazerLogin(e) {
        e.preventDefault()
        try {
            const token = await login(user, senha)
            console.log(token);

            localStorage.setItem('token', token)

            navigate('/')
        } catch (error) {
            console.error(
                'Erro ao fazer login:',
                error.response?.data || error.message
            )
        }
    }
    return (
        <>


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
                        <label>Email ou Username: </label>
                        <input type="text" value={user} onChange={e => setUser(e.target.value)} />
                    </div>

                    <div className={styles.formGroup} >
                        <label>Senha: </label>
                        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>



                    <button type="submit" className={styles.button}>Entrar</button>
                    <p className={styles.forgotPassword}>
                        Esqueceu sua senha?
                    </p>

                    <div className={styles.separator}>
                        ou
                    </div>

                    <button type="button" className={styles.registerButton}>
                        Criar conta
                    </button>

                    <button
                        className={styles.backButton}
                        onClick={() => navigate("/")}
                    >
                        ← Voltar para Home
                    </button>
                </div>
            </form>
        </>)
}