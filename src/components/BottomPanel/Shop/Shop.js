import { useState } from 'react';
import UnvisibleButton from '../../UI/UnvisibleButton/UnvisibleButton';
import ShopOverlay from '../../ShopOverlay/ShopOverlay';
const Shop = (props) => {
    const [showShopingMenu, setShowShopingMenu] = useState(false);
    const clickShopHandler = (event) => {
        setShowShopingMenu((prevState) => !prevState);
    };
    return (
        <div>
            {showShopingMenu ? <ShopOverlay /> : ''}
            <UnvisibleButton
                button={{ type: 'submit', onClick: clickShopHandler }}
            >
                Shop
            </UnvisibleButton>
        </div>
    );
};
export default Shop;
