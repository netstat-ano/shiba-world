import UnvisibleButton from "../UI/UnvisibleButton/UnvisibleButton";
import { NeedsContext } from "../needs-context/NeedsContext";
import { useContext } from "react";
const GardenWork = () => {
    const needsCtx = useContext(NeedsContext);
    const onGarden = () => {
        needsCtx.dispatchNeeds({ type: "add", needs: "fun", howMuch: "20" });
    };
    return (
        <div>
            <UnvisibleButton button={{ onClick: onGarden }}>
                Take care of garden
            </UnvisibleButton>
        </div>
    );
};
export default GardenWork;
