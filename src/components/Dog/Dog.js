import { useContext, useEffect } from 'react';
import dog from '../../assets/img/dog.png';
import styles from './Dog.module.scss';
import { useDrop } from 'react-dnd';
import { NeedsContext } from '../needs-context/NeedsContext';
const Dog = () => {
    const needsCtx = useContext(NeedsContext);
    const feed = (item) => {
        console.log(item);
        needsCtx.dispatchNeeds({
            type: 'add',
            needs: 'hunger',
            howMuch: item.food,
        });
    };
    needsCtx.saveCurrentContextToDatabase();
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: 'food',
            drop: (item) => feed(item),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        []
    );
    return (
        <div className={styles['wrapper-dog']}>
            <img ref={drop} className={styles.dog} alt="dog" src={dog}></img>
        </div>
    );
};
export default Dog;
