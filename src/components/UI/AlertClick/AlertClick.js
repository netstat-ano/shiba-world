import ReactDOM from "react-dom";
const AlertClick = (props) => {
    return (
        <div className="center">
            <div>{props.title}</div>
            <hr></hr>
            <div>{props.content}</div>
            <div>
                <button onClick={props.onConfirm}>OK</button>
            </div>
        </div>
    );
};
const AlertClickPortal = (props) => {
    return ReactDOM.createPortal(
        <AlertClick {...props} />,
        document.getElementById("overlay-root")
    );
};
export default AlertClickPortal;
