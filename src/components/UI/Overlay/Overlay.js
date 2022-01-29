import ReactDOM from "react-dom";
import styles from "./Overlay.module.scss";
import Card from "../Card/Card";
import { useState } from "react";
const OverlayDOM = (props) => {
    const onClickGameHandler = (event) => {
        props.setGameMode(true);
        props.setGame(event.target.textContent);
        props.setIsOverlayShowed((prevState) => !prevState);
    };
    return (
        <div className={styles.overlay}>
            {props.elements.map((el) => (
                <Card key={el} onClick={onClickGameHandler}>
                    {el}
                </Card>
            ))}
        </div>
    );
};

const Overlay = (props) => {
    return ReactDOM.createPortal(
        <OverlayDOM
            setGameMode={props.setGameMode}
            setGame={props.setGame}
            setIsOverlayShowed={props.setIsOverlayShowed}
            elements={props.elements}
        />,
        document.getElementById("overlay-root")
    );
};
export default Overlay;
