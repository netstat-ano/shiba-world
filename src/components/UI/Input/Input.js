import styles from './Input.module.scss';
import React from 'react';
const Input = React.forwardRef((props, ref) => {
    return <input ref={ref} className={`${styles.input} ${props.className}`} {...props.input}></input>;
});
export default Input;
