import { useContext, useEffect, useState } from "react";
import { ref, runTransaction } from "firebase/database";
import { InventoryContext } from "../../../../inventory-context/InventoryContext";
import arrayChange from "../../../../../functions/arrayChange/arrayChange";
import { database } from "../../../../../firebase";
import { auth, getAuth } from "firebase/auth";
import { NeedsContext } from "../../../../needs-context/NeedsContext";

const clearZeroAmount = (obj, set) => {
    console.log(obj);
    for (const element in obj) {
        if (obj[element].amount <= 0) {
            delete obj[element];
        }
    }
    console.log(obj);
    set({ ...obj });
};
const ItemsSwitcher = (props) => {
    const initContent = () => {
        for (const item in props.inventory) {
            return props.inventory[item];
        }
    };
    const initItems = () => {
        const startingState = [];
        for (const element in props.inventory) {
            if (props.inventory[element].amount > 0) {
                startingState.push(props.inventory[element]);
            }
        }
        return startingState;
    };

    const invCtx = useContext(InventoryContext);
    const needsCtx = useContext(NeedsContext);
    const [itemIndex, setItemIndex] = useState(0);
    const [content, setContent] = useState(initContent());
    const [items, setItems] = useState(initItems());
    const auth = getAuth();
    const feed = () => {
        if (invCtx.items.amount > 0) {
            needsCtx.dispatchNeeds({
                type: "add",
                needs: "hunger",
                howMuch: invCtx.items.food,
            });
            const auth = getAuth();
            const user = auth.currentUser;
            const itemRef = ref(
                database,
                `users/${user.uid}/items/kitchen/${invCtx.items.name}`
            );
            runTransaction(itemRef, (element) => {
                if (element) {
                    if (element.amount - 1 <= 0) {
                        element = null;
                        setContent(items[0]);
                        props.setRerender({});
                    } else {
                        element.amount--;
                    }
                }

                return element;
            });
            let newState = {};
            invCtx.setItems((prevState) => {
                newState = { ...prevState, amount: prevState.amount - 1 };
                setContent({ ...newState });
                return { ...newState };
            });
        }
    };

    useEffect(() => {
        const update = (() => {
            let stateRef = [];
            return new Promise((resolve, reject) => {
                setItems("");
                for (const item in props.inventory) {
                    setItems((prevState) => {
                        const newState = [
                            ...prevState,
                            {
                                name: props.inventory[item].name,
                                amount: props.inventory[item].amount,
                                food: props.inventory[item].food,
                            },
                        ];
                        stateRef[0] = newState;
                        return newState;
                    });
                }
                resolve(stateRef);
            }).then((result) => {
                const [stateRef] = result;
                const index = stateRef.findIndex(
                    (fIndex) => fIndex.name === content.name
                );
                if (stateRef[index].amount >= 0) {
                    const newState = {
                        name: stateRef[index].name,
                        amount: stateRef[index].amount,
                    };
                    setContent({ ...newState });
                    invCtx.setItems({
                        ...newState,
                        food: stateRef[index].food,
                    });
                }
            });
        })();
    }, [props.inventory, itemIndex]);
    return (
        <>
            {items.length > 1 && (
                <div>
                    <button
                        onClick={() => {
                            arrayChange(
                                "left",
                                items,
                                itemIndex,
                                setItemIndex,
                                setContent
                            );
                        }}
                    >
                        Left
                    </button>
                </div>
            )}
            <div>
                <span onClick={feed}>
                    {content && `${content.name} x${content.amount}`}
                </span>
            </div>
            {items.length > 1 && (
                <div>
                    <button
                        onClick={() => {
                            arrayChange(
                                "right",
                                items,
                                itemIndex,
                                setItemIndex,
                                setContent
                            );
                        }}
                    >
                        Right
                    </button>
                </div>
            )}
        </>
    );
};
export default ItemsSwitcher;
