import ReactDOM from "react-dom";
import GameArea from "./GameArea/GameArea";
import ClearBoth from "../UI/ClearBoth/ClearBoth";
import styles from "./TicTacToe.module.scss";
import AlertClickPortal from "../UI/AlertClick/AlertClick";
import { GoldContext } from "../gold-context/GoldContext";
import { useContext, useEffect, useReducer, useState } from "react";
import { NeedsContext } from "../needs-context/NeedsContext";
const INIT_MOVE = {
    firstRow: ["", "", ""],
    secondRow: ["", "", ""],
    thirdRow: ["", "", ""],
};
const reset = (setResult, setTurn, dispatchBoard) => {
    console.log("reset");
    setResult(null);
    setTurn("player");
    dispatchBoard({ type: "reset" });
};
const AiMove = (board, dispatchBoard, setTurn, setResult) => {
    const freePlaces = [];
    let haveFreePlaces = false;
    for (const row in board) {
        board[row].forEach((element, index) => {
            if (element === "") {
                freePlaces.push({
                    row: row,
                    index: index,
                });
                haveFreePlaces = true;
            }
        });
    }

    const rowsArr = freePlaces.map((e) => e.row);
    let randomRow = Math.floor(Math.random() * 3 + 1);
    const rows = rowsArr.join(" ");
    console.log(rows);
    if (haveFreePlaces) {
        if (randomRow === 1) {
            if (!rows.includes("firstRow")) {
                AiMove(board, dispatchBoard, setTurn, setResult);
                return;
            }
        } else if (randomRow === 2) {
            if (!rows.includes("secondRow")) {
                AiMove(board, dispatchBoard, setTurn, setResult);
                return;
            }
        } else if (randomRow === 3) {
            if (!rows.includes("thirdRow")) {
                AiMove(board, dispatchBoard, setTurn, setResult);
                return;
            }
        }
    }
    if (haveFreePlaces) {
        if (randomRow === 1) {
            const index = [];
            for (const element of freePlaces) {
                if (element.row === "firstRow") {
                    index.push(element.index);
                }
            }
            let randomArea = 0;
            if (index.length > 1) {
                randomArea = Math.floor(Math.random() * index.length);
            }
            dispatchBoard({
                row: "firstRow",
                index: index[randomArea],
                move: "o",
            });
            setTurn("player");
        }
        if (randomRow === 2) {
            const index = [];
            for (const element of freePlaces) {
                if (element.row === "secondRow") {
                    index.push(element.index);
                }
            }
            let randomArea = 0;
            if (index.length > 1) {
                randomArea = Math.floor(Math.random() * index.length);
            }
            dispatchBoard({
                row: "secondRow",
                index: index[randomArea],
                move: "o",
            });
            setTurn("player");
        }
        if (randomRow === 3) {
            const index = [];
            for (const element of freePlaces) {
                if (element.row === "thirdRow") {
                    index.push(element.index);
                }
            }
            let randomArea = 0;
            if (index.length > 1) {
                randomArea = Math.floor(Math.random() * index.length);
            }
            dispatchBoard({
                row: "thirdRow",
                index: index[randomArea],
                move: "o",
            });
            setTurn("player");
        }
    } else {
        setResult("No one");
    }
};
const TicTacToe = (props) => {
    const needsCtx = useContext(NeedsContext);
    const [result, setResult] = useState(null);
    const [turn, setTurn] = useState("player");
    const goldCtx = useContext(GoldContext);
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
            setResult(action.move);
            if (action.move === "x") {
                goldCtx.dispatchGold({ type: "add", howMuch: 2.5 });
                needsCtx.dispatchNeeds({
                    needs: "sleep",
                    type: "minus",
                    howMuch: 5,
                });
                needsCtx.dispatchNeeds({
                    needs: "hunger",
                    type: "minus",
                    howMuch: 5,
                });
                needsCtx.dispatchNeeds({
                    needs: "fun",
                    type: "minus",
                    howMuch: 10,
                });
                needsCtx.dispatchNeeds({
                    needs: "thirsty",
                    type: "minus",
                    howMuch: 10,
                });
                needsCtx.saveCurrentContextToDatabase();
            }
            setTurn(null);
        }
        return { ...state };
    };
    const [board, dispatchBoard] = useReducer(reduceMove, { ...INIT_MOVE });
    const onConfirmHandler = () => {
        reset(setResult, setTurn, dispatchBoard);
    };

    useEffect(() => {
        dispatchBoard({ type: "reset" });
    }, []);

    useEffect(() => {
        if (turn === "ai") {
            AiMove(board, dispatchBoard, setTurn, setResult);
        }
    }, [turn]);
    return (
        <div className={styles["tic-tac-toe"]}>
            {result !== null && (
                <AlertClickPortal
                    className={styles["win-alert"]}
                    title={`${result} has won`}
                    onConfirm={onConfirmHandler}
                />
            )}
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
            <div
                className={styles.quit}
                onClick={() => {
                    reset(setResult, setTurn, dispatchBoard);
                    props.onUndo();
                }}
            >
                Quit game
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
