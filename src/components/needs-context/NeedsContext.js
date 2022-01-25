import React, { useEffect, useReducer } from "react";
import { ref, get, child, runTransaction } from "firebase/database";
import { database } from "../../firebase";
import { getAuth } from "firebase/auth";
const INITIAL_NEEDS = {
    hunger: 0,
    thirsty: 0,
    fun: 0,
    sleep: 0,
};

export const NeedsContext = React.createContext({
    needs: {},
    dispatchNeeds: () => {},
    getNeedsFromDatabase: () => {},
    saveCurrentContextToDatabase: () => {},
});

const reduceNeeds = (state, action) => {
    if (action.type === "add") {
        state[`${action.needs}`] =
            Number(state[`${action.needs}`]) + Number(action.howMuch);
        return { ...state };
    } else if (action.type === "set") {
        return { ...action.data };
    } else if (action.type === "minus") {
        state[`${action.needs}`] =
            Number(state[`${action.needs}`]) - Number(action.howMuch);
        return { ...state };
    }
};

const NeedsContextProvider = (props) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const dbRef = ref(database);
    const needsRef = ref(database, `users/${user.uid}/needs`);
    const [needs, dispatchNeeds] = useReducer(reduceNeeds, {
        ...INITIAL_NEEDS,
    });
    const getNeedsFromDatabase = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const dbRef = ref(database);
        get(child(dbRef, `users/${user.uid}`))
            .then((snapshot) => {
                console.log(snapshot.val().needs);
                if (snapshot.exists()) {
                    dispatchNeeds({ type: "set", data: snapshot.val().needs });
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const saveCurrentContextToDatabase = () => {
        runTransaction(needsRef, (needsDb) => {
            if (needsDb) {
                for (const need in needs) {
                    needsDb[need] = needs[need];
                }
            }
            return needsDb;
        });
    };

    return (
        <NeedsContext.Provider
            value={{
                needs: needs,
                dispatchNeeds: dispatchNeeds,
                saveCurrentContextToDatabase: saveCurrentContextToDatabase,
                getNeedsFromDatabase: getNeedsFromDatabase,
            }}
        >
            {props.children}
        </NeedsContext.Provider>
    );
};
export default NeedsContextProvider;
