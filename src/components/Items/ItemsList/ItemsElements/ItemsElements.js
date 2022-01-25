import ItemsSwitcher from "./ItemsSwitcher/ItemsSwitcher";
const ItemsElements = (props) => {
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
