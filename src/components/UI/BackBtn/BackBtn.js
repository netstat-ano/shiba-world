import UnvisibleButton from '../UnvisibleButton/UnvisibleButton';
import styles from './BackBtn.module.scss';
const BackBtn = (props) => {
    return (
        <UnvisibleButton
            className={styles['back-btn']}
            button={{
                ...props.button,
            }}
        >
            Back
        </UnvisibleButton>
    );
};
export default BackBtn;
