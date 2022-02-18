import ReactDOM from "react-dom";
import Board from "./Board/Board";
const Checkers = (props) => {
    return (
        <>
            <Board />
        </>
    );
};
const CheckersPortal = (props) => {
    return ReactDOM.createPortal(
        <Checkers {...props} />,
        document.getElementById("game-root")
    );
};
export default CheckersPortal;
