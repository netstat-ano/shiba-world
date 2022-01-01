import ClothesCategorie from './ClothesCategories/ClothesCategorie';
import BackBtn from '../../UI/BackBtn/BackBtn';
const Clothes = (props) => {
    const onUndoHandler = () => {
        props.setUrl('');
    };
    return (
        <div>
            <div>
                <BackBtn button={{ onClick: onUndoHandler }}>Back</BackBtn>
            </div>
            {props.categoriesClothes.map((element) => {
                return (
                    <ClothesCategorie
                        key={element.category}
                        setUrl={props.setUrl}
                        category={element.category}
                    />
                );
            })}
        </div>
    );
};
export default Clothes;
