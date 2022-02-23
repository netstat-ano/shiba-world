const isCapturingPawnPossible = (currentPawn) => {
    const [firstResult, secondResult] = currentPawn.result;
    if (currentPawn.target.classList.contains("white-pawn")) {
        if (
            firstResult != undefined &&
            firstResult.children.length > 0 &&
            firstResult.children[0].classList.contains("black-pawn")
        ) {
            console.log(firstResult);
            return {
                activePlace: [
                    currentPawn.arr[currentPawn.arr.indexOf(firstResult) - 6],
                ],
                capturedPawn: firstResult,
            };
        }
        if (
            secondResult != undefined &&
            secondResult.children.length > 0 &&
            secondResult.children[0].classList.contains("black-pawn")
        ) {
            console.log(secondResult);
            return {
                activePlace: [
                    currentPawn.arr[currentPawn.arr.indexOf(secondResult) - 8],
                ],
                capturedPawn: secondResult,
            };
        }
    }
    return { activePlace: [] };
};
export default isCapturingPawnPossible;
