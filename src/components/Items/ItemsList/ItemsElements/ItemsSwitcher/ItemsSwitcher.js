import { useContext, useEffect, useRef, useState } from "react";
import { InventoryContext } from "../../../../inventory-context/InventoryContext";
import arrayChange from "../../../../../functions/arrayChange/arrayChange";
import { useDrag } from "react-dnd";
const ItemsSwitcher = (props) => {
    const initContent = () => {
        for (const item in props.inventory) {
            return props.inventory[item];
        }
    };
    const initItems = () => {
        const startingState = [];
        for (const element in props.inventory) {
            startingState.push(props.inventory[element]);
        }
        return startingState;
    };
    initItems();

    const invCtx = useContext(InventoryContext);
    const [itemIndex, setItemIndex] = useState(0);
    const [content, setContent] = useState(initContent());
    const [items, setItems] = useState(initItems());

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "food",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
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
                if (stateRef[index].amount > 0) {
                    const newState = {
                        name: stateRef[index].name,
                        amount: stateRef[index].amount,
                    };
                    setContent({ ...newState });
                    console.log(newState);
                    invCtx.setItems({
                        ...newState,
                        food: stateRef[index].food,
                    });
                }
            });
        })();
    }, [props.inventory, itemIndex]);
    console.log(invCtx.items);
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
                <span ref={drag}>
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
