import { useContext } from "react";
import UnvisibleButton from "../UI/UnvisibleButton/UnvisibleButton";
import { SleepContext } from "../sleep-context/SleepContext";
import { NeedsContext } from "../needs-context/NeedsContext";
const Sleep = () => {
    const needsCtx = useContext(NeedsContext);
    const sleepCtx = useContext(SleepContext);
    const onSleep = () => {
        let sleepProgress = needsCtx.needs.sleep;
        const sleep = () => {
            const timeoutID = setTimeout(() => {
                sleepProgress += 5;
                if (sleepProgress < 100 && !sleepCtx.isDogSleeping) {
                    needsCtx.dispatchNeeds({
                        type: "add",
                        needs: "sleep",
                        howMuch: 4,
                    });
                    sleep();
                } else {
                    clearTimeout(timeoutID);
                    sleepCtx.setIsDogSleeping(false);
                }
            }, 1000);
        };

        if (sleepCtx.isDogSleeping) {
            sleepCtx.setIsDogSleeping(false);
        } else {
            sleepCtx.setIsDogSleeping(true);
            sleep();
        }
    };
    return (
        <div>
            <UnvisibleButton button={{ onClick: onSleep }}>
                Sleep
            </UnvisibleButton>
        </div>
    );
};
export default Sleep;
