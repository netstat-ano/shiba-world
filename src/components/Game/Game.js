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
    return (
        <div id="game" className={styles.game}>
            <GoldContextProvider>
                {!props.gameMode && <Gold />}
                <SleepContextProvider>
                    <PlaceContextProvider>
                        {!props.gameMode && <ChangeRoom />}
                        <NeedsContextProvider>
                            {!props.gameMode && <Needs />}
                            <DragDropContextProvider>
                                {!props.gameMode && <Dog />}
                                <BottomPanel setGameMode={props.setGameMode} />
                            </DragDropContextProvider>
                        </NeedsContextProvider>
                    </PlaceContextProvider>
                </SleepContextProvider>
            </GoldContextProvider>
        </div>
    );
};
export default Game;
