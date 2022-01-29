import styles from "./BottomPanel.module.scss";
import Shop from "./Shop/Shop";
import Items from "../Items/Items";
import Sleep from "../Sleep/Sleep";
import Bath from "../../Bath/Bath";
import { PlaceContext } from "../place-context/place-context";
import { useContext, useState } from "react";
import LivingRoom from "../../LivingRoom/LivingRoom";
const BottomPanel = (props) => {
    const [rerender, setRerender] = useState(false);
    const roomCtx = useContext(PlaceContext);
    return (
        <div className={styles["bottom-panel"]}>
            <Shop setRerender={setRerender} />
            {roomCtx.currentRoom !== "bedroom" &&
                roomCtx.currentRoom !== "bathroom" &&
                roomCtx.currentRoom !== "living-room" && (
                    <Items setRerender={setRerender} rerender={rerender} />
                )}

            {roomCtx.currentRoom === "bedroom" && <Sleep />}
            {roomCtx.currentRoom === "bathroom" && <Bath />}
            {roomCtx.currentRoom === "living-room" && (
                <LivingRoom setGameMode={props.setGameMode} />
            )}
            <div></div>
        </div>
    );
};
export default BottomPanel;
