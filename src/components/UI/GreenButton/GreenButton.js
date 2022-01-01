import styles from './GreenButton.module.scss';
const GreenButton = props =>{
    return <button className={`${styles['green-button']} ${props.className}`} {...props.button}>{props.children}</button>
};
export default GreenButton;