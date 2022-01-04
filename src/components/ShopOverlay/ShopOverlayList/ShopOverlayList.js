import ShopOverlayItem from '../ShopOverlayItem/ShopOverlayItem';
import BackBtn from '../../UI/BackBtn/BackBtn';
const ShopOverlayList = (props) => {
    const onUndoHandler = (event) => {
        props.setUrl('');
    };
    return (
        <>
            <div>
                <BackBtn
                    button={{
                        onClick: onUndoHandler,
                    }}
                >
                    Back
                </BackBtn>
            </div>
            {props.items.map((element) => {
                return (
                    <ShopOverlayItem
                        room={props.room}
                        type={props.type}
                        key={element.name}
                        item={element}
                    />
                );
            })}
        </>
    );
};
export default ShopOverlayList;
