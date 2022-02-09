import { useContext, useEffect, useState } from "react";
import { GoldContext } from "../gold-context/GoldContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Gold.module.scss";
const Gold = (props) => {
    const goldCtx = useContext(GoldContext);
    console.log(goldCtx);
    const [goldChange, setGoldChange] = useState("");
    useEffect(() => {
        let lastOperation = null;
        if (goldCtx.gold.lastOperation === "minus") {
            lastOperation = "-";
        } else if (goldCtx.gold.lastOperation === "add") {
            lastOperation = "+";
        }
        if (lastOperation !== null && goldCtx.gold.change !== 0) {
            setGoldChange(`${lastOperation}${goldCtx.gold.change}`);
            const timeout = setTimeout(() => {
                setGoldChange("");
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [goldCtx.gold.gold]);
    return (
        <div className={styles.gold}>
            <FontAwesomeIcon icon="dollar-sign" /> {goldCtx.gold.gold}
            <div className={styles["gold-change"]}>{goldChange}</div>
        </div>
    );
};
export default Gold;
