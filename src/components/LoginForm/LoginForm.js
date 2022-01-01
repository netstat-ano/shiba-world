import GreenButton from '../UI/GreenButton/GreenButton';
import styles from './LoginForm.module.scss';
import Card from '../UI/Card/Card';
import LoginInput from './LoginInput/LoginInput';
import Alert from '../UI/Alert/Alert';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import UnvisibleButton from '../UI/UnvisibleButton/UnvisibleButton';
import { useRef, useState } from 'react';

const LoginForm = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isValid, setIsValid] = useState(true);
    const [catchedError, setCatchedError] = useState({
        errorMessage: '',
        isError: false,
    });
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (isValid) {
            const emailValue = emailInputRef.current.value;
            const passwordValue = passwordInputRef.current.value;
            const auth = getAuth();
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    props.setUser(userCredential.user);
                })
                .catch((error) => {
                    setCatchedError((prevState) => {
                        return {
                            isError: true,
                            errorMessage: error.message,
                        };
                    });
                });
        }
    };
    return (
        <div className={styles['login-form']}>
            <div style={{ clear: 'both' }}></div>
            {catchedError.isError && (
                <Alert
                    type="bad"
                    setCatchedError={setCatchedError}
                    title="Error"
                    content={catchedError.errorMessage}
                />
            )}
            <Card className={styles.wrapper}>
                <form onSubmit={onSubmitHandler}>
                    <LoginInput
                        ref={emailInputRef}
                        id="email"
                        label="E-mail"
                        type="text"
                        styles={{
                            label: styles.label,
                            input: styles.input,
                        }}
                    />

                    <LoginInput
                        id="password"
                        label="Password"
                        type="password"
                        ref={passwordInputRef}
                        styles={{
                            label: styles.label,
                            input: styles.input,
                        }}
                    />
                    <div></div>
                    <div className={styles['button-control']}>
                        <GreenButton
                            className={styles.button}
                            button={{ type: 'submit' }}
                        >
                            Log in
                        </GreenButton>
                    </div>
                </form>
                <UnvisibleButton
                    button={{
                        type: 'button',
                        onClick: props.onRegister,
                    }}
                >
                    You can create new account here
                </UnvisibleButton>
            </Card>
        </div>
    );
};
export default LoginForm;
