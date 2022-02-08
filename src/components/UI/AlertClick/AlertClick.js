import ReactDOM from "react-dom";
import styles from "./AlertClick.module.scss";
const AlertClick = (props) => {
    return (
        <div className={`center ${props.className}`}>
            <div className={styles.title}>{props.title}</div>
            <div>{props.content}</div>
            <div>
                <button onClick={props.onConfirm}>OK</button>
            </div>
        </div>
    );
};
const AlertClickPortal = (props) => {
    return ReactDOM.createPortal(
        <AlertClick {...props} />,
        document.getElementById("overlay-root")
    );
};
export default AlertClickPortal;
