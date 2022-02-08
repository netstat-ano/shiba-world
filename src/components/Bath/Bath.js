import { getAuth } from "firebase/auth";
import UnvisibleButton from "../UI/UnvisibleButton/UnvisibleButton";
import { get, ref, runTransaction } from "firebase/database";
import { database } from "../../firebase";
import { GoldContext } from "../gold-context/GoldContext";
import { useContext } from "react";
const Bath = () => {
    const goldCtx = useContext(GoldContext);
    const onBathHandler = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const lastBathRef = ref(database, `users/${user.uid}/lastBath`);
        const currentDate = new Date();
        const currentHour = parseFloat(
            `${currentDate.getHours()}.${(currentDate.getMinutes() * 100) / 60}`
        );
        return new Promise((resolve, reject) => {
            runTransaction(lastBathRef, (bathDb) => {
                if (bathDb && Math.abs(currentHour - bathDb.value) > 0.5) {
                    bathDb.value = currentHour;
                    resolve(true);
                }
                return { ...bathDb };
            });
        }).then((is) => {
            if (is) {
                goldCtx.setGold((prevState) => {
                    return { change: 20, value: prevState + 10 };
                });
            }
        });
    };
    return (
        <UnvisibleButton button={{ onClick: onBathHandler }}>
            Take a bath
        </UnvisibleButton>
    );
};
export default Bath;
