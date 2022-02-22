import { useContext, useEffect, useRef } from "react";
import styles from "./Square.module.scss";
import searchPossibleMove from "./search-possible-move/searchPossibleMove";
import checkIfClickedSquareWasSelected from "./checkIfClickedSquareWasSelected/checkIfClickedSquareWasSelected";
import { CheckersContext } from "./checkers-context/CheckersContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    const aiMove = (event) => {
        if (event) {
            const board = event.target.parentNode.children;
            const boardArr = [...board];
            const blackPawnsOnBoard = boardArr.filter((element) => {
                return (
                    element.innerHTML.length > 0 &&
                    element.children[0].classList.contains("black-pawn")
                );
            });
            const randomBlackPawn =
                blackPawnsOnBoard[
                    Math.floor(Math.random() * blackPawnsOnBoard.length)
                ].children[0];
            const isMovePossible = searchPossibleMove(
                randomBlackPawn.children[0]
            );
            if (
                (isMovePossible[0] === undefined &&
                    isMovePossible[1] === undefined) ||
                isMovePossible[0].children.length > 0 ||
                isMovePossible[0].children.length > 0
            ) {
                aiMove(event);
            } else {
                console.log(randomBlackPawn);
                console.log(isMovePossible);
                isMovePossible[
                    Math.floor(Math.random() * isMovePossible.length)
                ].innerHTML = `<svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="circle"
                        class="svg-inline--fa fa-circle fa-w-16 Board_black-pawn__A6Yfw black-pawn"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                        ></path>
                    </svg>`;

                randomBlackPawn.parentNode.innerHTML = "";
            }
        }
    };

    const playerMove = (event) => {
        // zeby ta funkcja dzialala tylko po kliknieciu w pionka
        const isMovePossible = checkIfClickedSquareWasSelected(
            event.target,
            checkersCtx.active
        );
        if (isMovePossible) {
            move(event.target);
        } else {
            console.log(event.target);
            const response = searchPossibleMove(event.target);
            checkersCtx.setActive({
                activeElements: [...response],
                movedElement: divRef,
                className: styles.active,
            });
        }
        aiMove(event);
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
