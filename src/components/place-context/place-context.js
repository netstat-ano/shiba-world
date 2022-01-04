import React, { useState } from 'react';
export const PlaceContext = React.createContext({
    currentRoom: '',
    availableRooms: ['living-room', 'bedroom', 'bathroom', 'kitchen', 'garden'],
    onChangeCurrentRoom: (setRoom) => {},
});

const PlaceContextProvider = (props) => {
    const [room, setRoom] = useState('bathroom');
    return (
        <PlaceContext.Provider
            value={{
                currentRoom: room,
                availableRooms: [
                    'living-room',
                    'bedroom',
                    'bathroom',
                    'kitchen',
                    'garden',
                ],
                setRoom: setRoom,
            }}
        >
            {props.children}
        </PlaceContext.Provider>
    );
};
export default PlaceContextProvider;
