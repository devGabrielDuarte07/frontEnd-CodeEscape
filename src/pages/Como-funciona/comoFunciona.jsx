import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/navBar";

import styles from "./comoFunciona.module.css";
import {
    DoorOpen,
    Puzzle,
    Trophy,
    Medal,
    CircleCheckBig
} from "lucide-react";

export default function ComoFunciona() {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />

            <div className={styles.container}>
                <section className={styles.hero}>
                    <h1>🔐 Como Funciona o Code Escape</h1>

                    <p>
                        Resolva enigmas, escape das salas e dispute
                        posições no ranking contra outros jogadores.
                    </p>
                </section>

                <section className={styles.steps}>
                    <div className={styles.stepCard}>
                        <DoorOpen size={40} />

                        <h2>Escolha uma Sala</h2>

                        <p>
                            Explore as salas disponíveis e escolha o
                            desafio que deseja enfrentar.
                        </p>
                    </div>

                    <div className={styles.stepCard}>
                        <Puzzle size={40} />

                        <h2>Resolva os Enigmas</h2>

                        <p>
                            Cada sala possui uma sequência de enigmas
                            que devem ser resolvidos na ordem correta.
                        </p>
                    </div>

                    <div className={styles.stepCard}>
                        <CircleCheckBig size={40} />

                        <h2>Ganhe Pontos</h2>

                        <p>
                            Acertos aumentam sua pontuação e ajudam
                            você a subir no ranking.
                        </p>
                    </div>

                    <div className={styles.stepCard}>
                        <Trophy size={40} />

                        <h2>Suba no Ranking</h2>

                        <p>
                            Compare seus resultados com outros
                            jogadores e tente alcançar o topo.
                        </p>
                    </div>
                </section>

                <section className={styles.scoreSection}>
                    <h2>⭐ Sistema de Pontuação</h2>

                    <div className={styles.scoreCards}>
                        <div className={styles.scoreCard}>
                            <CircleCheckBig size={40} />

                            <h3>Resposta Correta</h3>

                            <p>
                                Cada enigma respondido corretamente
                                concede <strong>100 pontos</strong>.
                            </p>
                        </div>

                        <div className={styles.scoreCard}>
                            <Puzzle size={40} />

                            <h3>Resposta Incorreta</h3>

                            <p>
                                Cada tentativa errada reduz
                                <strong> 10 pontos</strong> da sua pontuação.
                            </p>
                        </div>

                        <div className={styles.scoreCard}>
                            <Medal size={40} />

                            <h3>Uso de Dicas</h3>

                            <p>
                                Utilizar uma dica reduz
                                <strong> 25 pontos</strong>, mas pode ajudar
                                você a avançar.
                            </p>
                        </div>

                        <div className={styles.scoreCard}>
                            <Trophy size={40} />

                            <h3>Ranking</h3>

                            <p>
                                Apenas sua melhor partida em cada sala
                                aparece no ranking. Em caso de empate,
                                vence quem concluir em menos tempo.
                            </p>
                        </div>


                    </div>
                    <div className={styles.example}>
                        <h3>Exemplo</h3>

                        <p>
                            10 enigmas resolvidos = 1000 pontos
                        </p>

                        <p>
                            2 erros = -20 pontos
                        </p>

                        <p>
                            1 dica utilizada = -25 pontos
                        </p>

                        <h4>Pontuação Final: 955 pontos</h4>
                    </div>
                </section>

                <section className={styles.difficulties}>
                    <h2>Níveis de Dificuldade</h2>

                    <div className={styles.difficultyCards}>
                        <div className={styles.easy}>
                            <h3>🟢 Fácil</h3>
                            <p>
                                Ideal para iniciantes e primeiros
                                desafios.
                            </p>
                        </div>

                        <div className={styles.medium}>
                            <h3>🟡 Médio</h3>
                            <p>
                                Exige raciocínio lógico e atenção aos
                                detalhes.
                            </p>
                        </div>

                        <div className={styles.hard}>
                            <h3>🔴 Difícil</h3>
                            <p>
                                Desafios complexos para quem busca
                                superar limites.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.cta}>
                    <h2>Pronto para escapar?</h2>

                    <p>
                        Escolha uma sala e comece sua aventura agora.
                    </p>

                    <button
                        className={styles.button}
                        onClick={() => navigate("/")}
                    >
                        Explorar Salas
                    </button>
                </section>
            </div>
        </>
    );
}