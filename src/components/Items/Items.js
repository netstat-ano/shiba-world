import ItemsList from "./ItemsList/ItemsList";
const Items = (props) => {
    return (
        <>
            <ItemsList
                setRerender={props.setRerender}
                rerender={props.rerender}
            />
        </>
    );
};
export default Items;
