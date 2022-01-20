import styles from "./BottomPanel.module.scss";
import Shop from "./Shop/Shop";
import Items from "../Items/Items";
import { useState } from "react";
const BottomPanel = (props) => {
    const [rerender, setRerender] = useState(false);
    return (
        <div className={styles["bottom-panel"]}>
            <Shop setRerender={setRerender} />
            <Items rerender={rerender} />
            <div>Action</div>
        </div>
    );
};
export default BottomPanel;
