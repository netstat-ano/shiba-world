import styles from './BottomPanel.module.scss';
import Shop from './Shop/Shop';
const BottomPanel = (props) => {
    return (
        <div className={styles['bottom-panel']}>
            <Shop />
            <div>Items</div>
            <div>Action</div>
        </div>
    );
};
export default BottomPanel;
