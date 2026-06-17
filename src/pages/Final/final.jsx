import { useNavigate } from "react-router-dom"

export default function Final(){
    const navigate = useNavigate()
    return(
        <>
            <div>
                <h1>parabens, vc terminou</h1>
                <button onClick={() => navigate("/home")}>Voltar</button>
            </div>
        </>
    )
}