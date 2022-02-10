import ReactDOM from "react-dom";
import GreenButton from "../GreenButton/GreenButton";
import styles from "./AlertClick.module.scss";
const AlertClick = (props) => {
    return (
        <div className={`center ${props.className}`}>
            <div className={styles.title}>{props.title}</div>
            <div>{props.content}</div>
            <div>
                <GreenButton button={{ onClick: props.onConfirm }}>
                    OK
                </GreenButton>
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
