import BottomPanel from "../BottomPanel/BottomPanel";
import styles from "./Game.module.scss";
import PlaceContextProvider from "../place-context/place-context";
import InventoryContextProvider from "../inventory-context/InventoryContext";
import ChangeRoom from "../ChangeRoom/ChangeRoom";
import Dog from "../Dog/Dog";
import NeedsContextProvider from "../needs-context/NeedsContext";
import DragDropContextProvider from "../DragDropContextProvider/DragDropContextProvider";
import Needs from "../Needs/Needs";
const Game = (props) => {
    return (
        <div className={styles["bottom-panel"]}>
            <PlaceContextProvider>
                <ChangeRoom />
                <NeedsContextProvider>
                    <Needs />
                    <DragDropContextProvider>
                        <InventoryContextProvider>
                            <Dog />
                            <BottomPanel />
                        </InventoryContextProvider>
                    </DragDropContextProvider>
                </NeedsContextProvider>
            </PlaceContextProvider>
        </div>
    );
};
export default Game;
