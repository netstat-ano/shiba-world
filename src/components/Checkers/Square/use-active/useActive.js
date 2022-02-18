import { useState } from "react";

const useActive = (elements, className, board) => {
    const [active, setActive] = useState({
        activeElements: elements.activeElements,
        movedElements: elements.movedElements,
    });
    if (board.current) {
        console.log(board.current.parentNode.children);
        for (const square of board.current.parentNode.children) {
            if (square.classList.contains(className)) {
                square.classList.remove(className);
            }
        }
    }
    for (const element in active.activeElements) {
        if (active.activeElements[`${element}`].children.length === 0) {
            active.activeElements[`${element}`].classList.add(className);
        }
    }
    return [active, setActive];
};
export default useActive;
