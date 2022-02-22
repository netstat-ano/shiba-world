const checkIfClickedSquareWasSelected = (clickedSquare, active) => {
    let returningValue = null;
    for (const element of active.activeElements) {
        if (element === clickedSquare) {
            returningValue = element;
        }
    }
    return returningValue;
};
export default checkIfClickedSquareWasSelected;
