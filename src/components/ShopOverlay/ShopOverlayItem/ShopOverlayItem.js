import styles from './ShopOverlayItem.module.scss';
import UnvisibleButton from '../../UI/UnvisibleButton/UnvisibleButton';
import Card from '../../UI/Card/Card';
import { ref, set, get, runTransaction } from 'firebase/database';
import { database } from '../../../firebase.js';
import { getAuth } from 'firebase/auth';
import { InventoryContext } from '../../inventory-context/InventoryContext';
import { useContext, useState } from 'react';
const ShopOverlayItem = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const invCtx = useContext(InventoryContext);
    const auth = getAuth();
    const user = auth.currentUser;
    const timeout = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const onBuyHandler = (event) => {
        const db = ref(database);
        const foodRef = ref(
            database,
            `users/${user.uid}/items/${props.room}/${props.item.name}`
        );
        const update = get(foodRef)
            .then((snapshot) => {
                setIsDisabled(true);
                if (snapshot.hasChild('name')) {
                    runTransaction(foodRef, (data) => {
                        if (data) {
                            data.amount++;
                            invCtx.setItems((prevState) => {
                                const newState = { ...prevState };
                                newState[props.item.name] = data;
                                return { ...newState };
                            });
                        }
                        return data;
                    });
                } else {
                    set(foodRef, {
                        name: props.item.name,
                        amount: 1,
                    });
                    invCtx.setItems((prevState) => {
                        const newState = { ...prevState };
                        newState[props.item.name] = {
                            name: props.item.name,
                            amount: 1,
                        };
                        return newState;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        Promise.race([
            update,
            timeout(700).then(() => {
                setIsDisabled(false);
            }),
        ]);
    };
    console.log(invCtx.items);

    return (
        <Card>
            <div className={styles['shop-item__name']}>{props.item.name}</div>
            <div className={styles['shop-item__price']}>
                {props.item.price} gold
            </div>
            <div>
                <UnvisibleButton
                    button={{ onClick: onBuyHandler, disabled: isDisabled }}
                >
                    Buy
                </UnvisibleButton>
            </div>
        </Card>
    );
};
export default ShopOverlayItem;
