import { useContext } from 'react';
import {PlaceContext} from '../place-context/place-context'
const Items = (props) => {
    const placeCtx = useContext(PlaceContext);
    console.log(placeCtx);
    return <div>Items</div>;
};
export default Items;