import ProgressBar from '../UI/ProgressBar/ProgressBar';
import styles from './Needs.module.scss';
import { NeedsContext } from '../needs-context/NeedsContext';
import { useContext, useEffect } from 'react';
const Needs = () => {
    const NeedsCtx = useContext(NeedsContext);
    useEffect(() => {
        NeedsCtx.getNeedsFromDatabase();
    }, []);
    return (
        <div className={styles.center}>
            <div className={styles.needs}>
                <ProgressBar label="hunger" height={NeedsCtx.needs.hunger} />
                <ProgressBar label="thirsty" height={NeedsCtx.needs.thirsty} />
                <ProgressBar label="fun" height={NeedsCtx.needs.fun} />
                <ProgressBar label="sleep" height={NeedsCtx.needs.sleep} />
            </div>
        </div>
    );
};
export default Needs;
