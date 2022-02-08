import styles from "./ChangeRoom.module.scss";
import { PlaceContext } from "../place-context/place-context";
import { useContext, useState } from "react";
import arrayChange from "../../functions/arrayChange/arrayChange";
import ArrowButton from "../UI/ArrowButton/ArrowButton";
const ChangeRoom = () => {
    const roomCtx = useContext(PlaceContext);
    const [roomIndex, setRoomIndex] = useState(2);

    return (
        <div className={styles.center}>
            <ArrowButton
                direction="left"
                button={{
                    onClick: () => {
                        arrayChange(
                            "left",
                            roomCtx.availableRooms,
                            roomIndex,
                            setRoomIndex,
                            roomCtx.setRoom
                        );
                    },
                }}
            />

            <label>{roomCtx.currentRoom}</label>
            <ArrowButton
                direction="right"
                button={{
                    onClick: () => {
                        arrayChange(
                            "right",
                            roomCtx.availableRooms,
                            roomIndex,
                            setRoomIndex,
                            roomCtx.setRoom
                        );
                    },
                }}
            />
        </div>
    );
};
export default ChangeRoom;
