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
        for (const item in props.inventory) {
            const update = (() => {
                return new Promise((resolve, reject) => {
                    let isCurrentItem = false;
                    if (content && item === content.name) {
                        isCurrentItem = true;
                    }
                    setItems((prevState) => {
                        setItems('');
                        for (const element in props.inventory) {
                            setItems((prevState) => {
                                const newState = [
                                    ...prevState,
                                    {
                                        name: props.inventory[element].name,
                                        amount: props.inventory[element].amount,
                                    },
                                ];
                                const index = newState.findIndex(
                                    (fIndex) => fIndex.name === content.name
                                );
                                resolve([isCurrentItem, newState, index]);
                                return newState;
                            });
                        }
                    });
                }).then((result) => {
                    const [item, newState, index] = result;
                    console.log(newState[index]);
                    if (item && newState[index].amount > 0) {
                        setContent({
                            name: newState[index].name,
                            amount: newState[index].amount,
                        });
                    }
                });
            })();
        }
    }, [props.inventory]);
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
