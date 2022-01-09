import { useContext, useEffect, useState } from 'react';
import { InventoryContext } from '../../../../inventory-context/InventoryContext';
import arrayChange from '../../../../../functions/arrayChange/arrayChange';

const ItemsSwitcher = (props) => {
    const initContent = () => {
        for (const item in props.inventory) {
            return props.inventory[item];
        }
    };

    const invCtx = useContext(InventoryContext);
    const [itemIndex, setItemIndex] = useState(0);
    const [content, setContent] = useState(initContent());
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //     setItems([]);
    // }, []);

    useEffect(() => {
        for (const item in props.inventory) {
            setItems((prevState) => {
                return [...prevState, props.inventory[item]];
            });
        }
    }, [props.inventory]);
    useEffect(() => {
        // if (Object.keys(invCtx.items).length === 0) {
        //     setContent(items[0]);
        // }
        for (const item of items) {
            if (invCtx.items[item.name]) {
                const update = (() => {
                    return new Promise((resolve, reject) => {
                        let isCurrentItem = false;
                        console.log(item);
                        if (item && item.name === content.name) {
                            //item w jednym przypadku jest undefinied
                            isCurrentItem = true;
                        }
                        setItems((prevState) => {
                            const index = prevState.indexOf(item);
                            prevState.splice(
                                prevState.indexOf(item),
                                1,
                                invCtx.items[item.name]
                            ); //ustawie sie undefinied w 1 przypadku
                            resolve([isCurrentItem, [...prevState], index]);
                            return [...prevState];
                        });
                    }).then((result) => {
                        const [item, newState, index] = result;
                        console.log(item);
                        if (item) {
                            console.log('---------then---------');
                            console.log(newState[index].name);
                            console.log(newState[index].amount);
                            setContent({
                                name: newState[index].name,
                                amount: newState[index].amount,
                            });
                        }
                    });
                })();
            }
        }
    }, [invCtx.items]);
    console.log(invCtx.items);
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
            <div>
                {content.name} x{content.amount}
            </div>
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
