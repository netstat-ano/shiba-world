import BottomPanel from '../BottomPanel/BottomPanel';
import styles from './Game.module.scss';
import PlaceContextProvider from '../place-context/place-context';
import InventoryContextProvider from '../inventory-context/InventoryContext';
import ChangeRoom from '../ChangeRoom/ChangeRoom';
const Game = (props) => {
    return (
        <div className={styles['bottom-panel']}>
            <PlaceContextProvider>
                <ChangeRoom />
                <InventoryContextProvider>
                    <BottomPanel />
                </InventoryContextProvider>
            </PlaceContextProvider>
        </div>
    );
};
export default Game;
