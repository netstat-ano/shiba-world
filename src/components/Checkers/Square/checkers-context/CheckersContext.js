import React, { useEffect, useState } from "react";

export const CheckersContext = React.createContext({
    active: "",
    setActive: () => {},
});

const CheckersContextProvider = (props) => {
    const [active, setActive] = useState({
        activeElements: "",
        movedElement: "",
        className: "",
    });
    console.log(active);
    useEffect(() => {
        if (active.movedElement.current) {
            const board = active.movedElement.current.parentNode;
            console.log(board);
            for (const square of board.children) {
                if (square.classList.contains(active.className)) {
                    square.classList.remove(active.className);
                }
            }

            for (const element in active.activeElements) {
                if (active.activeElements[`${element}`].children.length === 0) {
                    active.activeElements[`${element}`].classList.add(
                        active.className
                    );
                }
            }
        }
    }, [active]);
    return (
        <CheckersContext.Provider
            value={{ active: active, setActive: setActive }}
        >
            {props.children}
        </CheckersContext.Provider>
    );
};
export default CheckersContextProvider;
