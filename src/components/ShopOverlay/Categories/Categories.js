import UnvisibleButton from '../../UI/UnvisibleButton/UnvisibleButton';
import styles from './Categories.module.scss';
import shopItemStyles from '../ShopOverlayItem/ShopOverlayItem.module.scss';
import Card from '../../UI/Card/Card';
const Categories = (props) => {
    const onChangeCategoryHandler = (event) => {
        const clickedCategory = event.target.textContent.toLowerCase();
        props.setUrl(`/${clickedCategory}`);
    };
    return (
        <div>
            <div className={`${styles.categorie} ${shopItemStyles['shop-item']}`}>
                <UnvisibleButton button={{ onClick: onChangeCategoryHandler }}>
                    <Card>Foods</Card>
                </UnvisibleButton>
            </div>
            <div className={`${styles.categorie} ${shopItemStyles['shop-item']}`}>
                <UnvisibleButton button={{ onClick: onChangeCategoryHandler }}>
                    <Card>Drinks</Card>
                </UnvisibleButton>
            </div>
            <div className={`${styles.categorie} ${shopItemStyles['shop-item']}`}>
                <UnvisibleButton button={{ onClick: onChangeCategoryHandler }}>
                    <Card>Clothes</Card>
                </UnvisibleButton>
            </div>
        </div>
    );
};
export default Categories;
