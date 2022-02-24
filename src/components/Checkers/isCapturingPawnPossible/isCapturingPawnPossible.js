const isCapturingPawnPossible = (currentPawn) => {
    const [firstResult, secondResult] = currentPawn.result;
    let result = { activePlace: [], capturedPawn: [] };
    if (currentPawn.target.classList.contains("white-pawn")) {
        console.log(firstResult);
        console.log(secondResult);
        if (
            firstResult != undefined &&
            firstResult.children.length > 0 &&
            firstResult.children[0].classList.contains("black-pawn")
        ) {
            console.log("bicie");
            const possiblePlace =
                currentPawn.arr[currentPawn.arr.indexOf(firstResult) - 6];
            console.log(possiblePlace);
            if (possiblePlace.children.length === 0) {
                result = {
                    activePlace: [possiblePlace, ...result.activePlace],
                    capturedPawn: [firstResult, ...result.capturedPawn],
                };
            }
        }
        if (
            secondResult != undefined &&
            secondResult.children.length > 0 &&
            secondResult.children[0].classList.contains("black-pawn")
        ) {
            console.log("bicie");
            const possiblePlace =
                currentPawn.arr[currentPawn.arr.indexOf(secondResult) - 8];
            console.log(possiblePlace);
            if (possiblePlace.children.length === 0) {
                result = {
                    activePlace: [possiblePlace, ...result.activePlace],
                    capturedPawn: [secondResult, ...result.capturedPawn],
                };
            }
        }
    }
    console.log(result);
    return result;
};
export default isCapturingPawnPossible;
