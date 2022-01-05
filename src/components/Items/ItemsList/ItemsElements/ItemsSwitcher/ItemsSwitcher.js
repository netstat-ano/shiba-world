import { useContext } from 'react';
import { InventoryContext } from '../../../../inventory-context/InventoryContext';
const ItemsSwitcher = (props) => {
    const invCtx = useContext(InventoryContext);
    const items = [];
    let content = '';
    for (const item in props.inventory) {
        items.push(props.inventory[item]);
    }
    if (Object.keys(invCtx.items).length === 0) {
        content = `${items[0].name} x${items[0].amount}`;
    } else {
        content = `${invCtx.items[items[0].name].name} x${
            invCtx.items[items[0].name].amount
        }`;
    }
    return (
        <>
            <div></div>
            <div>{content}</div>
            <div></div>
        </>
    );
};
export default ItemsSwitcher;
