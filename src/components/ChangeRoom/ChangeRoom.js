import styles from './ChangeRoom.module.scss';
import { PlaceContext } from '../place-context/place-context';
import { useContext, useState } from 'react';
const ChangeRoom = () => {
    const roomCtx = useContext(PlaceContext);
    const [room, setRoom] = useState({ room: 'bathroom', index: 2 });
    const onChangeLeftHandler = () => {
            roomCtx.currentRoom = roomCtx.availableRooms[room.index - 1];
            setRoom((prevState) => {
                return {
                    room: roomCtx.currentRoom,
                    index: prevState.index - 1,
                };
            });
        if (room.index === 0) {
            setRoom((prevState) => {
                return {
                    ...prevState,
                    index: roomCtx.availableRooms.length,
                };
            });
        }
    };
    const onChangeRightHandler = () => {
        roomCtx.currentRoom = roomCtx.availableRooms[room.index + 1];
        setRoom((prevState) => {
            return { room: roomCtx.currentRoom, index: prevState.index + 1 };
        });
        if (room.index >= 3) {
            setRoom((prevState) => {
                return {
                    ...prevState,
                    index: -1,
                };
            });
        }
    };
    console.log(room);
    return (
        <div className={styles.center}>
            <button onClick={onChangeLeftHandler}>Arrow left</button>
            <label>{room.room}</label>
            <button onClick={onChangeRightHandler}>Arrow right</button>
        </div>
    );
};
export default ChangeRoom;
