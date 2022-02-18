const searchPossibleMove = (event) => {
    const board = event.target.parentNode.parentNode.parentNode;
    const square = event.target.parentNode.parentNode;
    const tab = [...board.children];
    const possibleMoves = tab.filter((element) =>
        element.classList.contains("board-black")
    );
    for (const element of possibleMoves) {
        if (element === square) {
            console.log(element);
        }
    }
    let result = [];
    possibleMoves.forEach((element, index, arr) => {
        if (element === square) {
            result = [arr[index - 3], arr[index - 4]];
        }
    });
    return result;
};
export default searchPossibleMove;
