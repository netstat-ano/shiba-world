import { getAuth } from 'firebase/auth';
import { ref, get, child } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { PlaceContext } from '../../place-context/place-context';
import { database } from '../../../firebase';
import ItemsElements from './ItemsElements/ItemsElements';
import { InventoryContext } from '../../inventory-context/InventoryContext';
const ItemsList = () => {
    const [inventory, setInventory] = useState({});
    const invCtx = useContext(InventoryContext);
    const roomCtx = useContext(PlaceContext);
    const auth = getAuth();
    const user = auth.currentUser;
    const dbRef = ref(database);
    useEffect(() => {
        get(child(dbRef, `users/${user.uid}/items/${roomCtx.currentRoom}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setInventory({ ...data });
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [roomCtx.currentRoom, dbRef, user.uid, invCtx]);
    return (
        <div>
            <ItemsElements inventory={inventory} />
        </div>
    );
};
export default ItemsList;
