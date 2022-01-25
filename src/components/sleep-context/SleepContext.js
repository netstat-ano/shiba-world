import React, { useState } from "react";
export const SleepContext = React.createContext({
    isDogSleeping: false,
    setIsDogSleeping: () => {},
});

const SleepContextProvider = (props) => {
    const [isDogSleeping, setIsDogSleeping] = useState(false);
    return (
        <SleepContext.Provider
            value={{
                isDogSleeping: isDogSleeping,
                setIsDogSleeping: setIsDogSleeping,
            }}
        >
            {props.children}
        </SleepContext.Provider>
    );
};
export default SleepContextProvider;
