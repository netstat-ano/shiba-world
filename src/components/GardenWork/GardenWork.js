import UnvisibleButton from "../UI/UnvisibleButton/UnvisibleButton";
import { NeedsContext } from "../needs-context/NeedsContext";
import { useContext } from "react";
const GardenWork = () => {
    const needsCtx = useContext(NeedsContext);
    const onGarden = () => {
        if (needsCtx.needs.fun < 100) {
            needsCtx.dispatchNeeds({
                type: "add",
                needs: "fun",
                howMuch: "20",
            });
        }
        if (needsCtx.needs.thirsty > 15) {
            needsCtx.dispatchNeeds({
                type: "minus",
                needs: "thirsty",
                howMuch: "15",
            });
        }
        if (needsCtx.needs.hunger > 10) {
            needsCtx.dispatchNeeds({
                type: "minus",
                needs: "hunger",
                howMuch: "10",
            });
        }
    };
    return (
        <>
            <UnvisibleButton button={{ onClick: onGarden }}>
                Take the dog for a walk
            </UnvisibleButton>
        </>
    );
};
export default GardenWork;
