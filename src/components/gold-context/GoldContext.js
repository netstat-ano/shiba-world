import React, { useEffect, useReducer, useState } from "react";
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
const reduceGold = (state, action) => {
    if (action.type === "add") {
        state.gold += action.howMuch;
    } else if (action.type === "minus") {
        state.gold -= action.howMuch;
    } else if (action.type === "set") {
        state.gold = action.value;
        return { ...state };
    }
    state.change = action.howMuch;
    state.lastOperation = action.type;
    return { ...state };
};
const GoldContextProvider = (props) => {
    const [gold, dispatchGold] = useReducer(reduceGold, {
        gold: 0,
        change: 0,
        lastOperation: null,
    });
    useEffect(() => {
        const db = ref(database);
        const auth = getAuth();
        const user = auth.currentUser;
        get(child(db, `users/${user.uid}/gold`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatchGold({ type: "set", value: snapshot.val().value });
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    saveGoldToDatabase(gold.gold);
    return (
        <GoldContext.Provider
            value={{
                gold: gold,
                dispatchGold: dispatchGold,
            }}
        >
            {props.children}
        </GoldContext.Provider>
    );
};
export default GoldContextProvider;
