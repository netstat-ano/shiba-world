import { useContext } from "react";
import dog from "../../assets/img/dog.png";
import sleepingDog from "../../assets/img/sleeping-dog.png";
import styles from "./Dog.module.scss";
import { NeedsContext } from "../needs-context/NeedsContext";
import { InventoryContext } from "../inventory-context/InventoryContext";
import { SleepContext } from "../sleep-context/SleepContext";
const Dog = () => {
    const needsCtx = useContext(NeedsContext);
    const invCtx = useContext(InventoryContext);
    const sleepCtx = useContext(SleepContext);
    needsCtx.saveCurrentContextToDatabase();
    return (
        <div className={styles["wrapper-dog"]}>
            <img
                className={styles.dog}
                alt="dog"
                src={sleepCtx.isDogSleeping ? sleepingDog : dog}
            ></img>
        </div>
    );
};
export default Dog;
