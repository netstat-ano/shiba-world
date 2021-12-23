import styles from './ShopOverlayItem.module.scss';
import UnvisibleButton from '../../UI/UnvisibleButton/UnvisibleButton';
import Card from '../../UI/Card/Card';
const ShopOverlayItem = (props) => {
    console.log(props.item);
    return (
        <Card>
            <div className={styles['shop-item__name']}>{props.item.name}</div>
            <div className={styles['shop-item__price']}>{props.item.price} gold</div>
            <div><UnvisibleButton>Buy</UnvisibleButton></div>
        </Card>
    );
};
export default ShopOverlayItem;
