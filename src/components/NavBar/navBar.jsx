import { NavLink } from "react-router-dom"
import styles from "./navBar.module.css"

import { User, Lock } from "lucide-react"
export default function NavBar() {


    return (<>
        <nav className={styles.navbar}>

            <div className={styles.logo}>
                <Lock />
                <span>Code Escape</span>
            </div>

            <div className={styles.links}>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
                    Home
                </NavLink>
                <NavLink to="/como-funciona" className={({ isActive }) => isActive ? styles.active : styles.link}>
                    Como funciona
                </NavLink>
                <NavLink to="/perfil" className={({ isActive }) => isActive ? styles.active : styles.link}>
                    Perfil
                </NavLink>
            </div>

            <div className={styles.user}>
                <User />
                <span>Meu Perfil</span>
            </div>

        </nav>
    </>)
}