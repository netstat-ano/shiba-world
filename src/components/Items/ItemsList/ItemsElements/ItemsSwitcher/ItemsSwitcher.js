import { useContext, useEffect, useState } from 'react';
import { InventoryContext } from '../../../../inventory-context/InventoryContext';
import arrayChange from '../../../../../functions/arrayChange/arrayChange';

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

    useEffect(() => {
        const update = (() => {
            let stateRef = [];
            return new Promise((resolve, reject) => {
                setItems('');
                for (const item in props.inventory) {
                    setItems((prevState) => {
                        const newState = [
                            ...prevState,
                            {
                                name: props.inventory[item].name,
                                amount: props.inventory[item].amount,
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
                    setContent({
                        name: stateRef[index].name,
                        amount: stateRef[index].amount,
                    });
                }
            });
        })();
    }, [props.inventory]);
    console.log(items);
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        arrayChange(
                            'left',
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
            <div>{content && `${content.name} x${content.amount}`}</div>
            <div>
                <button
                    onClick={() => {
                        arrayChange(
                            'right',
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
        </>
    );
};
export default ItemsSwitcher;
