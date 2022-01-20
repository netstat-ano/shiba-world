import { useContext, useEffect } from "react";
import dog from "../../assets/img/dog.png";
import styles from "./Dog.module.scss";
import { useDrop } from "react-dnd";
import { NeedsContext } from "../needs-context/NeedsContext";
import { InventoryContext } from "../inventory-context/InventoryContext";
import { database } from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, runTransaction } from "firebase/database";
const Dog = () => {
    const needsCtx = useContext(NeedsContext);
    const invCtx = useContext(InventoryContext);
    console.log(invCtx);
    const feed = (items) => {
        console.log(items);
        // needsCtx.dispatchNeeds({
        //     type: "add",
        //     needs: "hunger",
        //     howMuch: invCtx.items.food,
        // });
        // const auth = getAuth();
        // const user = auth.currentUser;
        // const itemRef = ref(
        //     database,
        //     `users/${user.uid}/items/kitchen/${invCtx.items.name}`
        // );
        // runTransaction(itemRef, (element) => {
        //     console.log(element);
        //     if (element) {
        //         element.amount--;
        //     }

        //     return element;
        // });
    };
    needsCtx.saveCurrentContextToDatabase();
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "food",
            drop: (items) => feed(items),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        []
    );
    return (
        <div className={styles["wrapper-dog"]}>
            <img ref={drop} className={styles.dog} alt="dog" src={dog}></img>
        </div>
    );
};
export default Dog;
