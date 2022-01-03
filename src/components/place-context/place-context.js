import React from 'react';
export const PlaceContext = React.createContext({
    currentRoom: 'bathroom',
    availableRooms: ['living-room', 'bedroom', 'bathroom', 'kitchen', 'garden'],
});

const PlaceContextProvider = (props) => {
    return (
        <PlaceContext.Provider
            value={{
                currentRoom: 'bathroom',
                availableRooms: [
                    'living-room',
                    'bedroom',
                    'bathroom',
                    'kitchen',
                    'garden',
                ],
            }}
        >
            {props.children}
        </PlaceContext.Provider>
    );
};
export default PlaceContextProvider;
