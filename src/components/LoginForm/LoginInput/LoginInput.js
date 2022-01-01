import Input from '../../UI/Input/Input';
import React from 'react';
const LoginInput = React.forwardRef((props, ref) => {
    return (
        <div>
            <label className={props.styles.label} htmlFor={props.id}>
                {props.label}
            </label>
            <Input
                className={`${props.styles.input} ${props.className}`}
                ref={ref}
                input={{
                    id: props.id,
                    placeholder: props.label,
                    type: props.type,
                    ...props.input,
                }}
            />
        </div>
    );
});
export default LoginInput;
