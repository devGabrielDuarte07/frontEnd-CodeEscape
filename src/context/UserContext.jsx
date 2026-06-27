import { createContext, useContext, useEffect, useState } from "react";
import { obterPerfil } from "../services/usuarioService";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    async function carregarUsuario() {
        const token = localStorage.getItem("token");

        if (!token) {
            setUsuario(null);
            return;
        }

        try {
            const dados = await obterPerfil();

            setUsuario(dados);
        }
        catch {
            setUsuario(null);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUsuario(null);
    }

    useEffect(() => {
        carregarUsuario();
    }, []);
    return (
        <UserContext.Provider
            value={{
                usuario,
                carregarUsuario,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}