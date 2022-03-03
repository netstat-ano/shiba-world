import { useContext, useEffect, useRef } from "react";
import styles from "./Square.module.scss";
import searchPossibleMove from "./search-possible-move/searchPossibleMove";
import checkIfClickedSquareWasSelected from "./checkIfClickedSquareWasSelected/checkIfClickedSquareWasSelected";
import { CheckersContext } from "./checkers-context/CheckersContext";
const Square = (props) => {
    const divRef = useRef();
    const checkersCtx = useContext(CheckersContext);
    let pawn = "";

    const move = (target, divRef, capturedPawn) => {
        const arr = [...divRef.current.parentElement.children];
        const firstPossiblyCaptured = arr[arr.indexOf(target) + 8];
        const secondPossiblyCaptured = arr[arr.indexOf(target) + 6];
        console.log(capturedPawn);
        console.log(firstPossiblyCaptured);
        console.log(secondPossiblyCaptured);
        if (
            firstPossiblyCaptured.children !== undefined &&
            firstPossiblyCaptured.children.length > 0 &&
            arr[arr.indexOf(target) + 16].children.length === 0
        ) {
            firstPossiblyCaptured.innerHTML = "";
        } else if (
            secondPossiblyCaptured.children !== undefined &&
            secondPossiblyCaptured.children.length > 0 &&
            arr[arr.indexOf(target) + 12].children.length === 0
        ) {
            secondPossiblyCaptured.innerHTML = "";
        }
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
            console.log(boardArr);
            const blackPawnsOnBoard = boardArr.filter((element) => {
                return (
                    element.innerHTML.length > 0 &&
                    element.children[0].classList.contains("black-pawn")
                );
            });
            let possibleCapturingPawn = blackPawnsOnBoard.filter(
                (blackPawn) => {
                    const index = boardArr.indexOf(blackPawn);
                    console.log(boardArr[index + 8].children[0]);
                    if (
                        boardArr[index + 8].children[0] &&
                        boardArr[index + 8].children[0].classList.contains(
                            "white-pawn"
                        ) &&
                        boardArr[index + 16].children.length === 0 &&
                        boardArr[index + 16].classList.contains("board-black")
                    ) {
                        return boardArr[index];
                    } else {
                        return null;
                    }
                }
            );
            let randomBlackPawn = null;
            if (possibleCapturingPawn[0]) {
                randomBlackPawn = possibleCapturingPawn[0].children[0];
                console.log(randomBlackPawn.children[0]);
            }
            if (!randomBlackPawn) {
                randomBlackPawn =
                    blackPawnsOnBoard[
                        Math.floor(Math.random() * blackPawnsOnBoard.length)
                    ].children[0];
            }
            console.log(randomBlackPawn);
            console.log(possibleCapturingPawn);
            const isMovePossible = searchPossibleMove(
                randomBlackPawn.children[0]
            );
            console.log(randomBlackPawn);
            console.log(isMovePossible);
            if (isMovePossible.possibleMoves.length === 0) {
                aiMove(event);
            } else {
                const randomMove =
                    isMovePossible.possibleMoves[
                        Math.floor(
                            Math.random() * isMovePossible.possibleMoves.length
                        )
                    ];
                if (randomMove.children.length === 0) {
                    randomMove.innerHTML = `<svg
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
                } else {
                    aiMove(event);
                }
            }
        }
    };

    const playerMove = (event) => {
        // zeby ta funkcja dzialala tylko po kliknieciu w pionka
        const isMovePossible = checkIfClickedSquareWasSelected(
            event.target,
            checkersCtx.active
        );
        let response = null;

        response = searchPossibleMove(event.target);

        if (isMovePossible) {
            move(event.target, divRef);
            aiMove(event);
        } else {
            checkersCtx.setActive({
                activeElements: [...response.possibleMoves],
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
