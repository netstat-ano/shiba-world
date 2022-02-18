import UnvisibleButton from "../UI/UnvisibleButton/UnvisibleButton";
import { database } from "../../firebase";
import { get, child, ref } from "firebase/database";
import TicTacToePortal from "../TicTacToe/TicTacToe";
import Overlay from "../UI/Overlay/Overlay";
import { useEffect, useState } from "react";
import RockPaperScissorsPortal from "../RockPaperScissors/RockPaperScissors";
import CheckersPortal from "../Checkers/Checkers";
import CheckersContextProvider from "../Checkers/Square/checkers-context/CheckersContext";
const LivingRoom = (props) => {
    const [isOverlayShowed, setIsOverlayShowed] = useState(false);
    const [game, setGame] = useState("");
    const [elements, setElements] = useState([]);
    const onPlayHandler = () => {
        setIsOverlayShowed((prevState) => !prevState);
    };
    const onUndoHandler = () => {
        console.log("undo");
        setGame("");
        props.setGameMode(false);
    };
    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `games`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setElements(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            {game === "Tic tac toe" && (
                <TicTacToePortal onUndo={onUndoHandler} />
            )}
            {game === "Rock paper scissors" && (
                <RockPaperScissorsPortal onUndo={onUndoHandler} />
            )}
            {game === "Checkers" && (
                <CheckersContextProvider>
                    <CheckersPortal />
                </CheckersContextProvider>
            )}
            {isOverlayShowed && (
                <Overlay
                    setGameMode={props.setGameMode}
                    setGame={setGame}
                    setIsOverlayShowed={setIsOverlayShowed}
                    elements={[...elements]}
                />
            )}
            <UnvisibleButton button={{ onClick: onPlayHandler }}>
                Play
            </UnvisibleButton>
        </>
    );
};
export default LivingRoom;
