import { useContext, useEffect, useState } from "react";
import { GoldContext } from "../gold-context/GoldContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Gold.module.scss";
const Gold = (props) => {
    const goldCtx = useContext(GoldContext);
    const [goldChange, setGoldChange] = useState("");
    useEffect(() => {
        setGoldChange(`+${goldCtx.gold}`);
        const timeout = setTimeout(() => {
            setGoldChange("");
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [goldCtx.gold]);
    return (
        <div className={styles.gold}>
            <FontAwesomeIcon icon="dollar-sign" /> {goldCtx.gold}
            <div className={styles["gold-change"]}>{goldChange}</div>
        </div>
    );
};
export default Gold;
