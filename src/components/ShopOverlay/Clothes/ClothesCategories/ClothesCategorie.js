import Card from '../../../UI/Card/Card';
import UnvisibleButton from '../../../UI/UnvisibleButton/UnvisibleButton';
const ClothesCategorie = (props) => {
    const onNavigateHandler = () => {
        props.setUrl((prevUrl) => {
            return `${prevUrl}/${props.category}/items`;
        });
    };
    return (
        <Card>
            <UnvisibleButton button={{ onClick: onNavigateHandler }}>
                {props.category}
            </UnvisibleButton>
        </Card>
    );
};
export default ClothesCategorie;
