import styles from './ChangeRoom.module.scss';
import { PlaceContext } from '../place-context/place-context';
import { useContext, useState } from 'react';
const ChangeRoom = () => {
    const roomCtx = useContext(PlaceContext);
    const [roomIndex, setRoomIndex] = useState(2);
    const onChangeDirectionHandler = (
        type,
        array,
        startingPosition,
        setStartingPosition,
        setValue
    ) => {
        if (type === 'left') {
            if (startingPosition - 1 <= 0) {
                setStartingPosition(array.length);
            } else if (startingPosition - 1 >= array.length) {
                setStartingPosition(array.length);
            } else {
                setStartingPosition(startingPosition - 1);
            }
            setValue(array[startingPosition - 1]);
        } else if (type === 'right') {
            if (startingPosition + 1 >= array.length - 1) {
                setStartingPosition(-1); //jesli starting position + 1 jest wieksze od dlugosci tablicy - 1
            } else if (startingPosition + 1 < 0) {
                setStartingPosition(-1); //jesli starting postion + 1 jest mniejsze od zera
            } else {
                setStartingPosition(startingPosition + 1); //zawsze
            }
            setValue(array[startingPosition + 1]);
        }
    };

    console.log(roomIndex);
    console.log(roomCtx.currentRoom);
    return (
        <div className={styles.center}>
            <button
                onClick={() => {
                    onChangeDirectionHandler(
                        'left',
                        roomCtx.availableRooms,
                        roomIndex,
                        setRoomIndex,
                        roomCtx.setRoom
                    );
                }}
            >
                Arrow left
            </button>
            <label>{roomCtx.currentRoom}</label>
            <button
                onClick={() => {
                    onChangeDirectionHandler(
                        'right',
                        roomCtx.availableRooms,
                        roomIndex,
                        setRoomIndex,
                        roomCtx.setRoom
                    );
                }}
            >
                Arrow right
            </button>
        </div>
    );
};
export default ChangeRoom;
