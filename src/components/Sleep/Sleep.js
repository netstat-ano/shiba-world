import { useContext } from "react";
import UnvisibleButton from "../UI/UnvisibleButton/UnvisibleButton";
import { SleepContext } from "../sleep-context/SleepContext";
import { NeedsContext } from "../needs-context/NeedsContext";
const Sleep = () => {
    const needsCtx = useContext(NeedsContext);
    const sleepCtx = useContext(SleepContext);
    const onSleep = () => {
        let sleepProgress = needsCtx.needs.sleep;
        const sleep = (isSleeping) => {
            if (isSleeping) {
                return new Promise((resolve, reject) => {
                    const timeoutID = setTimeout(() => {
                        sleepProgress += 5;
                        if (sleepProgress < 100) {
                            needsCtx.dispatchNeeds({
                                type: "add",
                                needs: "sleep",
                                howMuch: 4,
                            });
                            resolve([timeoutID, true]);
                        } else {
                            sleepProgress = 100;
                            resolve([timeoutID, false]);
                        }
                    }, 1000);
                }).then((response) => {
                    const [timeoutID, isSleeping] = response;
                    clearTimeout(timeoutID);
                    if (!sleepCtx.isDogSleeping) {
                        sleep(false);
                    } else {
                        sleep(isSleeping);
                    }
                });
            } else {
                sleepCtx.setIsDogSleeping(false);
            }
        };

        if (sleepCtx.isDogSleeping) {
            console.log("stop");
            sleep(false);
        } else {
            console.log("init");
            sleepCtx.setIsDogSleeping(true);
            sleep(true);
        }
    };
    return (
        <>
            <UnvisibleButton button={{ onClick: onSleep }}>
                Sleep
            </UnvisibleButton>
        </>
    );
};
export default Sleep;
