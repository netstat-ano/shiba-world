import ReactDOM from "react-dom";
import GameArea from "./GameArea/GameArea";
import ClearBoth from "../UI/ClearBoth/ClearBoth";
import styles from "./TicTacToe.module.scss";
import AlertClickPortal from "../UI/AlertClick/AlertClick";
import { useEffect, useReducer, useState } from "react";
const INIT_MOVE = {
    firstRow: ["", "", ""],
    secondRow: ["", "", ""],
    thirdRow: ["", "", ""],
};
const AiMove = (board, dispatchBoard, setTurn) => {
    const randomRow = Math.floor(Math.random() * 3 + 1);
    const randomArea = Math.floor(Math.random() * 2);
    let haveFreePlaces = false;
    for (const row in board) {
        for (const element of board[row]) {
            if (element === "") {
                haveFreePlaces = true;
                break;
            }
        }
    }
    if (haveFreePlaces) {
        if (randomRow === 1) {
            if (board.firstRow[randomArea] === "") {
                dispatchBoard({
                    row: "firstRow",
                    index: randomArea,
                    move: "o",
                });
                setTurn("player");
            } else {
                AiMove(board, dispatchBoard, setTurn);
                return;
            }
        }
        if (randomRow === 2) {
            if (board.secondRow[randomArea] === "") {
                dispatchBoard({
                    row: "secondRow",
                    index: randomArea,
                    move: "o",
                });
                setTurn("player");
            } else {
                AiMove(board, dispatchBoard, setTurn);
                return;
            }
        }
        if (randomRow === 3) {
            if (board.thirdRow[randomArea] === "") {
                dispatchBoard({
                    row: "thirdRow",
                    index: randomArea,
                    move: "o",
                });
                setTurn("player");
            } else {
                AiMove(board, dispatchBoard, setTurn);
                return;
            }
        }
    }
};
const TicTacToe = (props) => {
    const [result, setResult] = useState(null);
    const [turn, setTurn] = useState("player");

    const reduceMove = (state, action) => {
        if (action.type === "reset") {
            return {
                firstRow: ["", "", ""],
                secondRow: ["", "", ""],
                thirdRow: ["", "", ""],
            };
        }
        state[`${action.row}`][action.index] = action.move;
        if (
            (state.firstRow[0] !== "" &&
                state.firstRow[0] === state.firstRow[1] &&
                state.firstRow[1] === state.firstRow[2]) ||
            (state.secondRow[0] !== "" &&
                state.secondRow[0] === state.secondRow[1] &&
                state.secondRow[0] === state.secondRow[2]) ||
            (state.thirdRow[0] !== "" &&
                state.thirdRow[0] === state.thirdRow[1] &&
                state.thirdRow[1] === state.thirdRow[2]) ||
            (state.firstRow[0] !== "" &&
                state.firstRow[0] === state.secondRow[1] &&
                state.secondRow[1] === state.thirdRow[2]) ||
            (state.firstRow[2] !== "" &&
                state.firstRow[2] === state.secondRow[1] &&
                state.secondRow[1] === state.thirdRow[0]) ||
            (state.firstRow[0] !== "" &&
                state.firstRow[0] === state.secondRow[0] &&
                state.secondRow[0] === state.thirdRow[0]) ||
            (state.firstRow[1] !== "" &&
                state.firstRow[1] === state.secondRow[1] &&
                state.secondRow[1] === state.thirdRow[1]) ||
            (state.firstRow[2] !== "" &&
                state.firstRow[2] === state.secondRow[2] &&
                state.secondRow[2] === state.thirdRow[2])
        ) {
            console.log("koniec");
            setResult(turn);
        }
        return { ...state };
    };
    const [board, dispatchBoard] = useReducer(reduceMove, { ...INIT_MOVE });
    const onConfirmHandler = () => {
        console.log("click");
        setResult(null);
        setTurn("player");
        dispatchBoard({ type: "reset" });
    };
    useEffect(() => {
        if (turn === "ai") {
            AiMove(board, dispatchBoard, setTurn);
        }
    }, [turn]);
    return (
        <div className={styles["tic-tac-toe"]}>
            {result !== null && (
                <AlertClickPortal onConfirm={onConfirmHandler} />
            )}
            <div onClick={props.onUndo}>X</div>
            <div className={result !== null ? styles.overlay : ""}>
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.firstRow[0]}
                    name={"firstRow"}
                    index={0}
                />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.firstRow[1]}
                    name={"firstRow"}
                    index={1}
                />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.firstRow[2]}
                    name={"firstRow"}
                    index={2}
                />
                <ClearBoth />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.secondRow[0]}
                    name={"secondRow"}
                    index={0}
                />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.secondRow[1]}
                    name={"secondRow"}
                    index={1}
                />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.secondRow[2]}
                    name={"secondRow"}
                    index={2}
                />
                <ClearBoth />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.thirdRow[0]}
                    name={"thirdRow"}
                    index={0}
                />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.thirdRow[1]}
                    name={"thirdRow"}
                    index={1}
                />
                <GameArea
                    turn={turn}
                    setTurn={setTurn}
                    dispatchBoard={dispatchBoard}
                    textContent={board.thirdRow[2]}
                    name={"thirdRow"}
                    index={2}
                />
                <ClearBoth />
            </div>
        </div>
    );
};

const TicTacToePortal = (props) => {
    return ReactDOM.createPortal(
        <TicTacToe onUndo={props.onUndo} />,
        document.getElementById("game-root")
    );
};
export default TicTacToePortal;
