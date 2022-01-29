import styles from "./GameArea.module.scss";
const GameArea = (props) => {
    const onClickHandler = () => {
        if (props.textContent === "" && props.turn === "player") {
            props.dispatchBoard({
                row: props.name,
                index: props.index,
                move: "x",
            });
            props.setTurn("ai");
        }
    };
    return (
        <div onClick={onClickHandler} className={styles["game-area"]}>
            {props.textContent}
        </div>
    );
};
export default GameArea;
