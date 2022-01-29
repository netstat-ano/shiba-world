import { useContext } from "react";
import { GoldContext } from "../gold-context/GoldContext";
const Gold = (props) => {
    const goldCtx = useContext(GoldContext);
    return <div>Gold: {goldCtx.gold}</div>;
};
export default Gold;
