import styles from './UnvisibleButton.module.scss';
const UnvisibleButton = props =>{
    return <button className={`${styles['unvisible-button']} ${props.className} `} {...props.button}>{props.children}</button>
}
export default UnvisibleButton;