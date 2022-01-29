import React, { useEffect, useState } from "react";
import {
    ref,
    child,
    get,
    runTransaction,
    getDatabase,
} from "firebase/database";
import { database } from "../../firebase";
import { getAuth } from "firebase/auth";

export const GoldContext = React.createContext({
    gold: 0,
    setGold: () => {},
});
const saveGoldToDatabase = (gold) => {
    if (gold) {
        const auth = getAuth();
        const user = auth.currentUser;
        const goldRef = ref(database, `users/${user.uid}/gold/value`);
        runTransaction(goldRef, (goldDb) => {
            if (goldDb) {
                goldDb = gold;
            }
            return goldDb;
        });
    }
};

const GoldContextProvider = (props) => {
    const [gold, setGold] = useState();
    useEffect(() => {
        const db = ref(database);
        const auth = getAuth();
        const user = auth.currentUser;
        get(child(db, `users/${user.uid}/gold`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setGold(snapshot.val().value);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    saveGoldToDatabase(gold);
    return (
        <GoldContext.Provider
            value={{
                gold: gold,
                setGold: setGold,
            }}
        >
            {props.children}
        </GoldContext.Provider>
    );
};
export default GoldContextProvider;
