import ItemsList from "./ItemsList/ItemsList";
const Items = (props) => {
    return (
        <>
            <ItemsList rerender={props.rerender} />
        </>
    );
};
export default Items;
