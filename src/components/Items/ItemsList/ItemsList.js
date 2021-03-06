import { getAuth } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { PlaceContext } from "../../place-context/place-context";
import { database } from "../../../firebase";
import ItemsElements from "./ItemsElements/ItemsElements";
const ItemsList = (props) => {
    const [inventory, setInventory] = useState({});
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
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(inventory);
    }, [roomCtx.currentRoom, dbRef, user.uid, props.rerender]);
    return (
        <div>
            <ItemsElements
                setRerender={props.setRerender}
                rerender={props.rerender}
                inventory={inventory}
            />
        </div>
    );
};
export default ItemsList;
