import ReactDOM from 'react-dom';
import Categories from './Categories/Categories';
import { database } from '../../firebase';
import Clothes from './Clothes/Clothes';
import { ref, onValue } from 'firebase/database';
import ShopOverlayList from './ShopOverlayList/ShopOverlayList';
import styles from './ShopOverlay.module.scss';
import { useEffect, useState } from 'react';
const ShopOverlay = (props) => {
    const [menuItems, setMenuItems] = useState([]);
    const [url, setUrl] = useState('');
    useEffect(() => {
        const searchingRef = ref(database, `shop${url}`);
        const searchingItems = [];
        onValue(searchingRef, (snapshot) => {
            const data = snapshot.val();
            for (const key in data) {
                searchingItems.push(data[key]);
            }
            setMenuItems(searchingItems);
        });
    }, [url]);

    const jsxRender = (
        <>
            <div className={`${styles['shop-overlay']}`}>
                <div className={styles.url}>{url}</div>
                <div className={styles['shop-overlay-list']}>
                    {url.length === 0 && <Categories setUrl={setUrl} />}
                    {url.includes('food') ||
                    url.includes('drinks') ||
                    url.includes('t-shirts') ||
                    url.includes('pants') ? (
                        <ShopOverlayList
                            type="buy"
                            setUrl={setUrl}
                            items={menuItems}
                        />
                    ) : (
                        ''
                    )}
                    {url.includes('clothes') && !url.includes('items') ? (
                        <Clothes
                            setUrl={setUrl}
                            categoriesClothes={menuItems}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    );

    return ReactDOM.createPortal(
        jsxRender,
        document.getElementById('overlay-root')
    );
};
export default ShopOverlay;
