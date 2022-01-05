import styles from './ChangeRoom.module.scss';
import { PlaceContext } from '../place-context/place-context';
import { useContext, useState } from 'react';
import arrayChange from '../../functions/arrayChange/arrayChange';
const ChangeRoom = () => {
    const roomCtx = useContext(PlaceContext);
    const [roomIndex, setRoomIndex] = useState(2);


    return (
        <div className={styles.center}>
            <button
                onClick={() => {
                    arrayChange(
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
                    arrayChange(
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
