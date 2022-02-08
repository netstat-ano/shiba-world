import { useContext, useEffect, useState } from "react";
import { ref, runTransaction, set } from "firebase/database";
import ArrowButton from "../../../../UI/ArrowButton/ArrowButton";
import arrayChange from "../../../../../functions/arrayChange/arrayChange";
import { database } from "../../../../../firebase";
import { getAuth } from "firebase/auth";
import { NeedsContext } from "../../../../needs-context/NeedsContext";
const ItemsSwitcher = (props) => {
    console.log(props.inventory);
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
    const needsCtx = useContext(NeedsContext);
    const [itemIndex, setItemIndex] = useState(0);
    const [content, setContent] = useState(initContent());
    const [items, setItems] = useState(initItems());
    const feed = () => {
        if (
            (content.amount > 0 &&
                content.food &&
                needsCtx.needs.hunger < 100) ||
            (content.amount > 0 &&
                content.drink &&
                needsCtx.needs.thirsty < 100)
        ) {
            if (content.food) {
                needsCtx.dispatchNeeds({
                    type: "add",
                    needs: "hunger",
                    howMuch: content.food,
                });
                if (needsCtx.needs.hunger > 100) {
                    needsCtx.dispatchNeeds({
                        type: "minus",
                        needs: "hunger",
                        howMuch: needsCtx.needs.hunger - 100,
                    });
                }
            } else {
                needsCtx.dispatchNeeds({
                    type: "add",
                    needs: "thirsty",
                    howMuch: content.drink,
                });
                if (needsCtx.needs.thirsty > 100) {
                    needsCtx.dispatchNeeds({
                        type: "minus",
                        needs: "thirsty",
                        howMuch: needsCtx.needs.thirsty - 100,
                    });
                }
            }
            const auth = getAuth();
            const user = auth.currentUser;
            const itemRef = ref(
                database,
                `users/${user.uid}/items/kitchen/${content.name}`
            );
            runTransaction(itemRef, (element) => {
                if (element) {
                    if (element.amount - 1 <= 0) {
                        setItems((prevState) => {
                            const newState = prevState.filter((value) => {
                                return value.name !== element.name;
                            });
                            return [...newState];
                        });
                        setContent((prevState) => {
                            const newState = items.filter((value) => {
                                return value.name !== element.name;
                            });
                            setContent({ ...newState[0] });
                            return { ...newState[0] };
                        });
                        element = null;
                        props.setRerender({});
                    } else {
                        console.log("--");
                        element.amount -= 1;
                        let newState = {};
                        setContent((prevState) => {
                            newState = {
                                ...prevState,
                                amount: prevState.amount - 1,
                            };
                            setContent({ ...newState });
                            return { ...newState };
                        });
                    }
                }

                return element;
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
                        let newState = [];
                        if (props.inventory[item].food) {
                            newState = [
                                ...prevState,
                                {
                                    name: props.inventory[item].name,
                                    amount: props.inventory[item].amount,
                                    food: props.inventory[item].food,
                                },
                            ];
                        } else {
                            newState = [
                                ...prevState,
                                {
                                    name: props.inventory[item].name,
                                    amount: props.inventory[item].amount,
                                    drink: props.inventory[item].drink,
                                },
                            ];
                        }
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
                if (index >= 0 && stateRef[index].amount >= 0) {
                    const newState = {
                        name: stateRef[index].name,
                        amount: stateRef[index].amount,
                    };
                    setContent({ ...newState });
                    if (stateRef[index].food) {
                        setContent({
                            ...newState,
                            food: stateRef[index].food,
                        });
                    } else {
                        setContent({
                            ...newState,
                            drink: stateRef[index].drink,
                        });
                    }
                } else {
                }
            });
        })();
    }, [props.inventory, itemIndex]);
    return (
        <>
            {items.length > 1 && (
                <div>
                    <ArrowButton
                        direction="left"
                        button={{
                            onClick: () => {
                                arrayChange(
                                    "left",
                                    items,
                                    itemIndex,
                                    setItemIndex,
                                    setContent
                                );
                            },
                        }}
                    />
                </div>
            )}
            <div>
                <span onClick={feed}>
                    {content && `${content.name} x${content.amount}`}
                </span>
            </div>
            {items.length > 1 && (
                <div>
                    <ArrowButton
                        direction="right"
                        button={{
                            onClick: () => {
                                arrayChange(
                                    "right",
                                    items,
                                    itemIndex,
                                    setItemIndex,
                                    setContent
                                );
                            },
                        }}
                    />
                </div>
            )}
        </>
    );
};
export default ItemsSwitcher;
