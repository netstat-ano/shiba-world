const ItemsSwitcher = (props) => {
    const items = [];
    for (const item in props.inventory) {
        items.push(props.inventory[item]);
    }
    console.log(items);

    return (
        <>
            <div></div>
            <div>{items[0].name} x{items[0].amount}</div>
            <div></div>
        </>
    );
};
export default ItemsSwitcher;
