import styles from "./ProgressBar.module.scss";
const ProgressBar = (props) => {
    let height = props.height;
    if (props.height < 0) {
        height = 0;
    }
    return (
        <div className={styles["progress-wrapper"]}>
            <div
                style={{ height: `${height}%`, maxHeight: "100%" }}
                className={styles.progress}
            >
                {props.label}
            </div>
        </div>
    );
};
export default ProgressBar;
