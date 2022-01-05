import React, { useState } from 'react';
export const InventoryContext = React.createContext({});

const InventoryContextProvider = (props) => {
    const [items, setItems] = useState({});
    return (
        <InventoryContext.Provider value={{ items: items, setItems: setItems }}>
            {props.children}
        </InventoryContext.Provider>
    );
};
export default InventoryContextProvider;
