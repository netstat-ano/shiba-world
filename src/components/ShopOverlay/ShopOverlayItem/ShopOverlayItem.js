import styles from "./ShopOverlayItem.module.scss";
import UnvisibleButton from "../../UI/UnvisibleButton/UnvisibleButton";
import Card from "../../UI/Card/Card";
import { ref, set, get, runTransaction } from "firebase/database";
import { database } from "../../../firebase.js";
import { getAuth } from "firebase/auth";
import { GoldContext } from "../../gold-context/GoldContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ShopOverlayItem = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const goldCtx = useContext(GoldContext);
    const auth = getAuth();
    const user = auth.currentUser;
    const timeout = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const onBuyHandler = (event) => {
        if (goldCtx.gold - props.item.price >= 0) {
            const db = ref(database);
            const foodRef = ref(
                database,
                `users/${user.uid}/items/${props.room}/${props.item.name}`
            );
            const update = get(foodRef)
                .then((snapshot) => {
                    setIsDisabled(true);
                    if (snapshot.hasChild("name")) {
                        runTransaction(foodRef, (data) => {
                            if (data) {
                                data.amount++;
                            }
                            return data;
                        });
                    } else if (props.item.food) {
                        set(foodRef, {
                            name: props.item.name,
                            amount: 1,
                            food: props.item.food,
                        });
                    } else {
                        set(foodRef, {
                            name: props.item.name,
                            amount: 1,
                            drink: props.item.drink,
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
                    goldCtx.setGold(
                        (prevState) => prevState - props.item.price
                    );
                    props.setRerender({});
                }),
            ]);
        }
    };
    console.log(props.item);
    return (
        <Card>
            <div className={styles["shop-item__name"]}>{props.item.name}</div>
            <div className={styles["shop-item__price"]}>
                {props.item.price} gold
            </div>
            {props.item.food && (
                <div>
                    <FontAwesomeIcon icon="bone" />
                </div>
            )}
            {props.item.drink && (
                <div>
                    <FontAwesomeIcon icon="tint" />
                </div>
            )}
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
