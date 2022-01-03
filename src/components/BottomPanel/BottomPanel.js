import styles from './BottomPanel.module.scss';
import Shop from './Shop/Shop';
import Items from '../Items/Items';
const BottomPanel = (props) => {
    return (
        <div className={styles['bottom-panel']}>
            <Shop />
            <Items />
            <div>Action</div>
        </div>
    );
};
export default BottomPanel;
