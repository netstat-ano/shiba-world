import BottomPanel from '../BottomPanel/BottomPanel';
import styles from './Game.module.scss';
import PlaceContextProvider from '../place-context/place-context';
import ChangeRoom from '../ChangeRoom/ChangeRoom';
const Game = (props) => {
    return (
        <div className={styles['bottom-panel']}>
            <PlaceContextProvider>
                <ChangeRoom />
                <BottomPanel />
            </PlaceContextProvider>
        </div>
    );
};
export default Game;
