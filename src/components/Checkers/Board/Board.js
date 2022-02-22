import React from "react";
import Square from "../Square/Square";
import styles from "./Board.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Board = (props) => {
    const blackPawn = (
        <FontAwesomeIcon
            className={`${styles["black-pawn"]} black-pawn`}
            icon="circle"
        />
    );
    const whitePawn = (
        <FontAwesomeIcon
            className={`${styles["white-pawn"]} white-pawn`}
            icon="circle"
        />
    );
    const renderedBoard = [];
    for (let i = 0; i < 63; i++) {
        if (i === 0 || i % 2 === 0) {
            renderedBoard.push(`${styles.white} board-white`);
        } else {
            renderedBoard.push(`${styles.black} board-black`);
        }
    }
    return (
        <div className={styles.board}>
            {renderedBoard.map((element, index) => {
                return (
                    <Square
                        whitePawn={whitePawn}
                        blackPawn={blackPawn}
                        index={index}
                        className={element}
                        pawn={whitePawn}
                    />
                );
            })}
        </div>
    );
};
export default Board;
