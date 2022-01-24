import ItemsSwitcher from "./ItemsSwitcher/ItemsSwitcher";
import { InventoryContext } from "../../../inventory-context/InventoryContext";
import { useContext } from "react";
const ItemsElements = (props) => {
    const inventoryCtx = useContext(InventoryContext);
    delete props.inventory.room;
    let invLen = 0;
    for (const element in props.inventory) {
        invLen++;
    }
    return (
        <div>
            {invLen > 0 ? (
                <ItemsSwitcher
                    setRerender={props.setRerender}
                    rerender={props.rerender}
                    inventory={props.inventory}
                />
            ) : (
                <p>You don't have items</p>
            )}
        </div>
    );
};
export default ItemsElements;
