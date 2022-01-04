import styles from './ChangeRoom.module.scss';
import { PlaceContext } from '../place-context/place-context';
import { useContext, useState } from 'react';
const ChangeRoom = () => {
    const roomCtx = useContext(PlaceContext);
    const [roomIndex, setRoomIndex] = useState(2);
    const onChangeLeftHandler = () => {
        roomCtx.setRoom(roomCtx.availableRooms[roomIndex - 1]);
        if (roomCtx.currentRoom === undefined) {
            roomCtx.setRoom('garden');
            setRoomIndex(roomCtx.availableRooms.length - 2);
        }
        setRoomIndex((prevState) => prevState - 1);
        if (roomIndex <= 1) {
            setRoomIndex(roomCtx.availableRooms.length);
        }
    };
    const onChangeRightHandler = () => {
        roomCtx.setRoom(roomCtx.availableRooms[roomIndex + 1]);
        if (roomCtx.currentRoom === undefined) {
            roomCtx.setRoom('living-room');
            setRoomIndex((prevState) => 1);
        }
        setRoomIndex((prevState) => prevState + 1);
        if (roomIndex >= 3) {
            setRoomIndex(-1);
        }
    };
    return (
        <div className={styles.center}>
            <button onClick={onChangeLeftHandler}>Arrow left</button>
            <label>{roomCtx.currentRoom}</label>
            <button onClick={onChangeRightHandler}>Arrow right</button>
        </div>
    );
};
export default ChangeRoom;
