import { useContext, useEffect, useRef } from "react";
import styles from "./Square.module.scss";
import searchPossibleMove from "./search-possible-move/searchPossibleMove";
import checkIfClickedSquareWasSelected from "./checkIfClickedSquareWasSelected/checkIfClickedSquareWasSelected";
import { CheckersContext } from "./checkers-context/CheckersContext";
const Square = (props) => {
    const divRef = useRef();
    const checkersCtx = useContext(CheckersContext);
    let pawn = "";

    const move = (target) => {
        target.innerHTML = checkersCtx.active.movedElement.current.innerHTML;
        checkersCtx.active.movedElement.current.innerHTML = "";
        checkersCtx.setActive((prevState) => {
            return {
                activeElements: "",
                movedElement: prevState.movedElement,
                className: styles.active,
            };
        });
    };

    const playerMove = (event) => {
        const isMovePossible = checkIfClickedSquareWasSelected(
            event.target,
            checkersCtx.active
        );
        if (isMovePossible) {
            move(event.target);
        } else {
            const response = searchPossibleMove(event);
            checkersCtx.setActive({
                activeElements: [...response],
                movedElement: divRef,
                className: styles.active,
            });
        }
    };
    if (props.className.includes("board-black")) {
        if (20 > props.index) {
            pawn = props.blackPawn;
        } else if (props.index > 42) {
            pawn = props.whitePawn;
        }
    }

    return (
        <div
            ref={divRef}
            onClick={playerMove}
            className={`${styles.square} ${props.className}`}
        >
            {pawn}
        </div>
    );
};
export default Square;
