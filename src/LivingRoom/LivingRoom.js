import UnvisibleButton from "../components/UI/UnvisibleButton/UnvisibleButton";
import { database } from "../firebase";
import { get, child, ref } from "firebase/database";
import TicTacToePortal from "../components/TicTacToe/TicTacToe";
import Overlay from "../components/UI/Overlay/Overlay";
import { useEffect, useState } from "react";
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
            {game === "tic-tac-toe" && (
                <TicTacToePortal onUndo={onUndoHandler} />
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
