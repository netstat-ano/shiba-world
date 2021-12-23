import ClothesCategorie from "./ClothesCategories/ClothesCategorie";
const Clothes = (props) => {
    return (
        <div>
            {props.categoriesClothes.map((element) => {
                return <ClothesCategorie setUrl={props.setUrl} category={element.category} />;
            })}
        </div>
    );
};
export default Clothes;
