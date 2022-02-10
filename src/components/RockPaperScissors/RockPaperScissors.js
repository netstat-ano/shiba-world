import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { GoldContext } from "../gold-context/GoldContext";
import styles from "./RockPaperScissors.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RockPaperScissors = (props) => {
    const [aiMoveState, setAiMoveState] = useState("");
    const [winner, setWinner] = useState("");
    const goldCtx = useContext(GoldContext);
    const AiMove = () => {
        return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    };

    const addGold = () => {
        goldCtx.dispatchGold({
            type: "add",
            howMuch: 1,
        });
    };

    const playerMove = async (event) => {
        const player = event.target.parentNode.id;
        const ai = AiMove();
        let currentWinner = "Draw";
        setAiMoveState(ai);
        if (player === ai) {
            setWinner("Draw");
        } else if (player === "rock" && ai === "paper") {
            setWinner("Ai");
        } else if (player === "rock" && ai === "scissors") {
            setWinner("Player");
            currentWinner = "Player";
        } else if (player === "paper" && ai === "rock") {
            setWinner("Player");
            currentWinner = "Player";
        } else if (player === "paper" && ai === "scissors") {
            setWinner("Ai");
        } else if (player === "scissors" && ai === "rock") {
            setWinner("Ai");
        } else if (player === "scissors" && ai === "paper") {
            setWinner("Player");
            currentWinner = "Player";
        }
        if (currentWinner === "Player") {
            addGold();
        }
    };
    return (
        <div className={styles["rock-paper-scissors"]}>
            <div>{winner !== "Draw" ? `${winner} has won` : "Draw"}</div>
            <div>Ai: {aiMoveState}</div>
            <div className={styles["player-hud"]}>
                <div>
                    <FontAwesomeIcon
                        onClick={playerMove}
                        id="rock"
                        icon="hand-rock"
                    />
                </div>
                <div>
                    <FontAwesomeIcon
                        onClick={playerMove}
                        id="paper"
                        icon="hand-paper"
                    />
                </div>
                <div>
                    <FontAwesomeIcon
                        onClick={playerMove}
                        id="scissors"
                        icon="hand-scissors"
                    />
                </div>
            </div>
            <div className={styles.quit} onClick={props.onUndo}>
                Quit game
            </div>
        </div>
    );
};
const RockPaperScissorsPortal = (props) => {
    return ReactDOM.createPortal(
        <RockPaperScissors {...props} />,
        document.getElementById("game-root")
    );
};
export default RockPaperScissorsPortal;
