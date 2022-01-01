import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
const Authentication = (props) => {
    const [status, setStatus] = useState('login');
    const onRegisterHandler = () => {
        setStatus('register');
    };
    const onLoginHandler = () => {
        setStatus('login');
    };
    return status === 'login' ? (
        <LoginForm setUser={props.setUser} onRegister={onRegisterHandler} />
    ) : (
        <RegisterForm setUser={props.setUser} onLogin={onLoginHandler} />
    );
};
export default Authentication;
