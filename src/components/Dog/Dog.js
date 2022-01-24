import { useContext } from "react";
import dog from "../../assets/img/dog.png";
import styles from "./Dog.module.scss";
import { NeedsContext } from "../needs-context/NeedsContext";
import { InventoryContext } from "../inventory-context/InventoryContext";
const Dog = () => {
    const needsCtx = useContext(NeedsContext);
    const invCtx = useContext(InventoryContext);
    console.log(invCtx);
    needsCtx.saveCurrentContextToDatabase();
    return (
        <div className={styles["wrapper-dog"]}>
            <img className={styles.dog} alt="dog" src={dog}></img>
        </div>
    );
};
export default Dog;
