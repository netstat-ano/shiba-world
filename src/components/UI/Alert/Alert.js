import styles from './Alert.module.scss';
const Alert = (props) => {
    setTimeout(() => {
        props.setCatchedError((prevState) => {
            return { errorMessage: '', isError: false };
        });
    }, 2500);
    let classNameAlert = '';
    if (props.type === 'bad') {
        classNameAlert = styles['bad-alert'];
    } else if (props.type === 'good') {
        classNameAlert = styles['good-alert'];
    }
    return (
        <div className={classNameAlert}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.content}>{props.content}</div>
        </div>
    );
};
export default Alert;
