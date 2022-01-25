import styles from "./BottomPanel.module.scss";
import Shop from "./Shop/Shop";
import Items from "../Items/Items";
import Sleep from "../Sleep/Sleep";
import { PlaceContext } from "../place-context/place-context";
import { useContext, useState } from "react";
const BottomPanel = (props) => {
    const [rerender, setRerender] = useState(false);
    const roomCtx = useContext(PlaceContext);
    return (
        <div className={styles["bottom-panel"]}>
            <Shop setRerender={setRerender} />
            {roomCtx.currentRoom !== "bedroom" ? (
                <Items setRerender={setRerender} rerender={rerender} />
            ) : (
                <Sleep />
            )}
            <div></div>
        </div>
    );
};
export default BottomPanel;
