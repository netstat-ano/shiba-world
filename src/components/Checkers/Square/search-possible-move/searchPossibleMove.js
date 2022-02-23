import isCapturingPawnPossible from "../../isCapturingPawnPossible/isCapturingPawnPossible";
const searchPossibleMove = (target) => {
    const board = target.parentNode.parentNode.parentNode;
    const square = target.parentNode.parentNode;
    const arr = [...board.children];
    let result = [];
    arr.forEach((element, index, arr) => {
        if (element === square) {
            if (
                square.children[0].classList.contains("white-pawn") &&
                (element === arr[13] ||
                    element === arr[27] ||
                    element === arr[41] ||
                    element === arr[55])
            ) {
                result = [arr[index - 8]];
            } else if (
                square.children[0].classList.contains("white-pawn") &&
                (element === arr[49] ||
                    element === arr[35] ||
                    element === arr[21] ||
                    element === arr[7])
            ) {
                result = [arr[index - 6]];
            } else if (
                square.children[0].classList.contains("black-pawn") &&
                (element === arr[13] ||
                    element === arr[27] ||
                    element === arr[41] ||
                    element === arr[55])
            ) {
                result = [arr[index + 6]];
            } else if (
                square.children[0].classList.contains("black-pawn") &&
                (element === arr[7] ||
                    element === arr[21] ||
                    element === arr[35] ||
                    element === arr[49])
            ) {
                result = [arr[index + 8]];
            } else if (square.children[0].classList.contains("white-pawn")) {
                result = [arr[index - 6], arr[index - 8]];
            } else {
                result = [arr[index + 6], arr[index + 8]];
            }
        }
    });
    const isCapturingPawn = isCapturingPawnPossible({
        square,
        arr,
        result,
        target: target.parentNode,
    });
    return {
        possibleMoves: [...result, ...isCapturingPawn.activePlace],
        capturedPawn: isCapturingPawn.capturedPawn,
    };
};
export default searchPossibleMove;
