import ItemsSwitcher from "./ItemsSwitcher/ItemsSwitcher";
import styles from "./ItemsElements.module.scss";
const ItemsElements = (props) => {
    delete props.inventory.room;
    let invLen = 0;
    for (const element in props.inventory) {
        invLen++;
    }
    return (
        <div className={styles.control}>
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
