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
                    element === arr[55]) &&
                arr[index - 8].children.length === 0
            ) {
                result = [arr[index - 8]];
            } else if (
                square.children[0].classList.contains("white-pawn") &&
                (element === arr[49] ||
                    element === arr[35] ||
                    element === arr[21] ||
                    element === arr[7]) &&
                arr[index - 6].children.length === 0
            ) {
                result = [arr[index - 6]];
            } else if (
                square.children[0].classList.contains("black-pawn") &&
                (element === arr[13] ||
                    element === arr[27] ||
                    element === arr[41] ||
                    element === arr[55]) &&
                arr[index + 6].children.length === 0
            ) {
                result = [arr[index + 6]];
            } else if (
                square.children[0].classList.contains("black-pawn") &&
                (element === arr[7] ||
                    element === arr[21] ||
                    element === arr[35] ||
                    element === arr[49]) &&
                arr[index + 8].children.length === 0
            ) {
                result = [arr[index + 8]];
            } else if (square.children[0].classList.contains("white-pawn")) {
                if (arr[index - 6].children.length === 0) {
                    result.push(arr[index - 6]);
                }
                if (arr[index - 8].children.length === 0) {
                    result.push(arr[index - 8]);
                }
            } else {
                if (arr[index + 6].children.length === 0) {
                    result.push(arr[index + 6]);
                }
                if (arr[index + 8].children.length === 0) {
                    result.push(arr[index + 8]);
                }
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
        capturedPawn: [...isCapturingPawn.capturedPawn],
    };
};
export default searchPossibleMove;
