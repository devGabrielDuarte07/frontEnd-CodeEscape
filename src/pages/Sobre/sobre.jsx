import NavBar from "../../components/NavBar/navBar";
import styles from "./sobre.module.css";

import fotoGabriel from "../../assets/gabriel.jpg";

import {
    User,
    Code2,
    Database,
    Globe,
    ExternalLink,
    ShieldCheck,
    Workflow,
    GitBranch
} from "lucide-react";

export default function Sobre() {
    return (
        <>
            <NavBar />

            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.hero}>
                        <img
                            className={styles.avatar}
                            src={fotoGabriel}
                            alt="Gabriel Duarte"
                        />

                        <div className={styles.info}>
                            <h1>Gabriel Duarte</h1>

                            <h2>Desenvolvedor Full Stack | ASP.NET Core & React</h2>

                            <div className={styles.badges}>
                                <span>React</span>
                                <span>ASP.NET Core</span>
                                <span>PostgreSQL</span>
                            </div>

                            <p>
                                Desenvolvedor focado em desenvolvimento web
                                e back-end, apaixonado por tecnologia e pela
                                criação de soluções eficientes utilizando
                                ASP.NET Core, React, Entity Framework e PostgreSQL.
                            </p>

                            <p className={styles.projectDescription}>
                                Atualmente desenvolvendo o <strong>Code Escape</strong>,
                                uma plataforma de escape room online com React,
                                ASP.NET Core, JWT Authentication, Entity Framework
                                e PostgreSQL.
                            </p>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>Tecnologias</h3>

                        <div className={styles.skills}>
                            <div className={styles.skill}>
                                <Code2 />
                                ASP.NET Core
                            </div>

                            <div className={styles.skill}>
                                <Globe />
                                React
                            </div>

                            <div className={styles.skill}>
                                <Database />
                                PostgreSQL
                            </div>

                            <div className={styles.skill}>
                                <ShieldCheck />
                                JWT
                            </div>

                            <div className={styles.skill}>
                                <Workflow />
                                Entity Framework
                            </div>

                            <div className={styles.skill}>
                                <GitBranch />
                                Git
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>Especialidades</h3>

                        <div className={styles.skills}>
                            <div className={styles.skill}>
                                APIs REST
                            </div>

                            <div className={styles.skill}>
                                Autenticação JWT
                            </div>

                            <div className={styles.skill}>
                                Entity Framework
                            </div>

                            <div className={styles.skill}>
                                PostgreSQL
                            </div>

                            <div className={styles.skill}>
                                React
                            </div>

                            <div className={styles.skill}>
                                ASP.NET Core
                            </div>
                        </div>
                    </div>

                    <div className={styles.links}>
                        <a
                            href="https://github.com/devGabrielDuarte07"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Code2 />
                            GitHub
                        </a>

                        <a
                            href="https://devgabrielduarte07.github.io/Portfolio-Gabriel/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <ExternalLink />
                            Portfólio
                        </a>

                        <a
                            href="https://www.linkedin.com/in/gabriel-duarte-bb25542b7/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <User />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}