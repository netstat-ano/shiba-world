import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import styles from "./ArrowButton.module.scss";
const ArrowButton = (props) => {
    let icon = null;
    if (props.direction === "left") {
        icon = "arrow-left";
    } else if (props.direction === "right") {
        icon = "arrow-right";
    }
    return (
        <button className={styles["arrow-button"]} {...props.button}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};
export default ArrowButton;
