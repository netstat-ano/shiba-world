import styles from './ShopOverlayItem.module.scss';
import UnvisibleButton from '../../UI/UnvisibleButton/UnvisibleButton';
import Card from '../../UI/Card/Card';
import { ref, set, get, child, runTransaction } from 'firebase/database';
import { database } from '../../../firebase.js';
import { getAuth } from 'firebase/auth';
import { PlaceContext } from '../../place-context/place-context';
import { useContext } from 'react';
const ShopOverlayItem = (props) => {
    const roomCtx = useContext(PlaceContext);
    const auth = getAuth();
    const user = auth.currentUser;
    const onBuyHandler = (event) => {
        const db = ref(database);
        const foodRef = ref(
            database,
            `users/${user.uid}/items/${props.room}/${props.item.name}`
        );
        get(child(db, `users/${user.uid}/items/${props.room}/${props.item.name}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    runTransaction(foodRef, (data) => {
                        if (data) {
                            data.amount++;
                        }
                        return data;
                    });
                } else {
                    set(
                        ref(
                            database,
                            `users/${user.uid}/items/${props.room}/${props.item.name}`
                        ),
                        {
                            name: props.item.name,
                            amount: 1,
                        }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Card>
            <div className={styles['shop-item__name']}>{props.item.name}</div>
            <div className={styles['shop-item__price']}>
                {props.item.price} gold
            </div>
            <div>
                <UnvisibleButton button={{ onClick: onBuyHandler }}>
                    Buy
                </UnvisibleButton>
            </div>
        </Card>
    );
};
export default ShopOverlayItem;
