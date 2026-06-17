import { useNavigate } from "react-router-dom";
import styles from "./roomCard.module.css";
import { Puzzle } from "lucide-react";
export default function RoomCard({ sala, apiUrl }) {
    const navigate = useNavigate();

    const badgeClasse = {
        "Fácil": styles.facil,
        "Média": styles.medio,
        "Difícil": styles.dificil
    };

    const cardClasse = {
        "Fácil": styles.facilCard,
        "Média": styles.medioCard,
        "Difícil": styles.dificilCard
    };

    const botaoClasse = {
        "Fácil": styles.botaoFacil,
        "Média": styles.botaoMedio,
        "Difícil": styles.botaoDificil
    };


    return (
        <div className={`${styles.card} ${cardClasse[sala.dificuldade]}`}>
            <img
                src={`${apiUrl}/${sala.capaUrl}`}
                alt={sala.nome}
                className={styles.capa}
            />

            <div className={styles.content}>

                <span className={`${styles.dificuldade} ${badgeClasse[sala.dificuldade]}`}>
                    {sala.dificuldade}
                </span>


                <h3 className={styles.titulo}>
                    {sala.nome}
                </h3>

                <p className={styles.descricao}>
                    {sala.descricao}
                </p>

                <div className={styles.info}>
                    <Puzzle size={16} />

                    <p className={styles.quantidade}>
                        {sala.quantidadeEnigma} enigmas
                    </p>
                </div>

                <button
                    className={`${styles.button} ${botaoClasse[sala.dificuldade]}`} 
                    onClick={() => navigate(`/room/${sala.id}`)}
                >
                    Explorar Sala
                </button>
            </div>
        </div>
    );
}