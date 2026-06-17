import { useNavigate, useParams } from "react-router-dom"
import { obterEnigmaAtual, responder } from "../../services/gameSessionService"
import { useEffect, useState } from "react"

export default function Game() {
    const navigate = useNavigate()
    const { gameSessionId } = useParams()
    const [enigma, setEnigma] = useState(null)
    const [resposta, setResposta] = useState("")

    useEffect(() => {
        async function carregarEnigma(gameSessionId) {
            try {
                const data = await obterEnigmaAtual(gameSessionId)

                setEnigma(data)
            }
            catch (error) {
                console.error(
                    error.response?.data || error.message
                )
            }
        }

        carregarEnigma(gameSessionId)
    }, [gameSessionId])


    async function responderEnigma(e) {
        e.preventDefault();
        try {
            const data = await responder(gameSessionId, resposta)
            console.log(data)
            if (data.acertou) {
                if(data.finalizada){
                    navigate("/game/finalizada")
                }
                const novoEnigma = await obterEnigmaAtual(gameSessionId)
                setEnigma(novoEnigma)
                setResposta("")
            } else {
                console.log("errou")
            }
        } catch (error) {
            console.error(error);
        }
    }
    if (!enigma) {
        return <h1>Carregando...</h1>;
    }
    return (
        <>
            <form onSubmit={responderEnigma}>
                <div>
                    <span>Enigma {enigma.ordem} de </span>

                    <h1>{enigma.titulo}</h1>

                    <p>{enigma.pergunta}</p>

                    <input
                        type="text"
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                        placeholder="Digite sua resposta"
                    />

                    <button type="submit">Responder</button>
                </div>
            </form>
        </>)

}