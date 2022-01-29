import BottomPanel from "../BottomPanel/BottomPanel";
import styles from "./Game.module.scss";
import PlaceContextProvider from "../place-context/place-context";
import ChangeRoom from "../ChangeRoom/ChangeRoom";
import Dog from "../Dog/Dog";
import Gold from "../Gold/Gold";
import NeedsContextProvider from "../needs-context/NeedsContext";
import DragDropContextProvider from "../DragDropContextProvider/DragDropContextProvider";
import GoldContextProvider from "../gold-context/GoldContext";
import Needs from "../Needs/Needs";
import SleepContextProvider from "../sleep-context/SleepContext";
import { useState } from "react";
const Game = (props) => {
    const [gameMode, setGameMode] = useState(false);
    return (
        <div>
            <GoldContextProvider>
                {!gameMode && <Gold />}
                <SleepContextProvider>
                    <PlaceContextProvider>
                        {!gameMode && <ChangeRoom />}
                        <NeedsContextProvider>
                            {!gameMode && <Needs />}
                            <DragDropContextProvider>
                                {!gameMode && <Dog />}
                                <BottomPanel setGameMode={setGameMode} />
                            </DragDropContextProvider>
                        </NeedsContextProvider>
                    </PlaceContextProvider>
                </SleepContextProvider>
            </GoldContextProvider>
        </div>
    );
};
export default Game;
