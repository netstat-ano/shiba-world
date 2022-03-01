const isCapturingPawnPossible = (currentPawn) => {
    const [firstResult, secondResult] = currentPawn.result;
    const arr = [...currentPawn.arr];
    let result = { activePlace: [], capturedPawn: [], arr: arr };
    const square = currentPawn.square;
    if (currentPawn.target.classList.contains("white-pawn")) {
        if (
            firstResult != undefined &&
            firstResult.children.length > 0 &&
            firstResult.children[0].classList.contains("black-pawn") &&
            square !== arr[13] &&
            square !== arr[27] &&
            square !== arr[41] &&
            square !== arr[55]
        ) {
            const possiblePlace =
                currentPawn.arr[currentPawn.arr.indexOf(firstResult) - 6];
            if (
                possiblePlace.children.length === 0 &&
                possiblePlace.classList.contains("board-black")
            ) {
                result = {
                    activePlace: [possiblePlace, ...result.activePlace],
                    capturedPawn: [firstResult, ...result.capturedPawn],
                    arr: arr,
                };
            }
        } else if (
            firstResult !== undefined &&
            firstResult.children.length > 0 &&
            firstResult.children[0].classList.contains("black-pawn") &&
            (square === arr[13] ||
                square === arr[27] ||
                square === arr[41] ||
                square === arr[55])
        ) {
            const possiblePlace =
                currentPawn.arr[currentPawn.arr.indexOf(firstResult) - 8];
            if (
                possiblePlace.children.length === 0 &&
                possiblePlace.classList.contains("board-black")
            ) {
                result = {
                    activePlace: [possiblePlace, ...result.activePlace],
                    capturedPawn: [firstResult, ...result.capturedPawn],
                    arr: arr,
                };
            }
        }
        if (
            secondResult != undefined &&
            secondResult.children.length > 0 &&
            secondResult.children[0].classList.contains("black-pawn")
        ) {
            const possiblePlace =
                currentPawn.arr[currentPawn.arr.indexOf(secondResult) - 8];
            if (
                possiblePlace.children.length === 0 &&
                possiblePlace.classList.contains("board-black")
            ) {
                result = {
                    activePlace: [possiblePlace, ...result.activePlace],
                    capturedPawn: [secondResult, ...result.capturedPawn],
                    arr: arr,
                };
            }
        }
    }
    return result;
};
export default isCapturingPawnPossible;
