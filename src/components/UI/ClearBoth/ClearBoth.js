import styles from "./ClearBoth.module.scss";
const ClearBoth = (props) => {
    return <div className={styles["clear-both"]}>{props.children}</div>;
};
export default ClearBoth;
