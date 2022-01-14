import styles from './ProgressBar.module.scss';
const ProgressBar = (props) => {
    console.log(props.height);
    return (
        <div className={styles['progress-wrapper']}>
            <div
                style={{ height: `${props.height}%`, maxHeight: '100%' }}
                className={styles.progress}
            >
                {props.label}
            </div>
        </div>
    );
};
export default ProgressBar;
