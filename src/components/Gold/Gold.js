import { useContext } from "react";
import { GoldContext } from "../gold-context/GoldContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Gold = (props) => {
    const goldCtx = useContext(GoldContext);
    return (
        <div>
            <FontAwesomeIcon icon="dollar-sign" /> {goldCtx.gold}
        </div>
    );
};
export default Gold;
