import { useRef, useState } from 'react';
import LoginInput from '../LoginForm/LoginInput/LoginInput';
import Card from '../UI/Card/Card';
import inputStyles from '../LoginForm/LoginForm.module.scss';
import styles from './RegisterForm.module.scss';
import GreenButton from '../UI/GreenButton/GreenButton';
import UnvisibleButton from '../UI/UnvisibleButton/UnvisibleButton';
import validate from '../../functions/authentication/validate';
import Alert from '../UI/Alert/Alert';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
const RegisterForm = (props) => {
    const [isValid, setIsValid] = useState({
        username: true,
        email: true,
        password: true,
        retypePassword: true,
    });
    const [catchedError, setCatchedError] = useState({
        errorMessage: '',
        isError: false,
    });
    const emailInputRef = useRef();
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const retypePasswordInputRef = useRef();
    const validateData = (event) => {
        const result = validate(event.target.value, event.target.id, passwordInputRef.current.value);
        setIsValid((prevState) => {
            prevState[`${event.target.id}`] = result;
            return { ...prevState };
        });
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        for (const element in isValid) {
            if (isValid[element] === false) {
                return;
            }
        }
        const emailValue = emailInputRef.current.value;
        const passwordValue = passwordInputRef.current.value;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: usernameInputRef.current.value,
                })
                    .then(() => {
                        props.setUser(auth.currentUser);
                    })
                    .catch((error) => {
                        setCatchedError((prevState) => {
                            return {
                                isError: true,
                                errorMessage: error.message,
                            };
                        });
                    });
            })
            .catch((error) => {
                setCatchedError((prevState) => {
                    return {
                        isError: true,
                        errorMessage: error.message,
                    };
                });
            });
    };
    return (
        <div className={inputStyles['login-form']}>
            {catchedError.isError ? (
                <Alert
                    type="bad"
                    setCatchedError={setCatchedError}
                    title="Error"
                    content={catchedError.errorMessage}
                />
            ) : (
                ''
            )}
            <div className={styles.center}>
                <Card className={styles['register-form']}>
                    <form onSubmit={onSubmitHandler}>
                        <LoginInput
                            className={!isValid.username ? styles.invalid : ''}
                            ref={usernameInputRef}
                            id="username"
                            label="Username"
                            type="text"
                            styles={{
                                label: inputStyles.label,
                                input: inputStyles.input,
                            }}
                            input={{
                                onBlur: validateData,
                            }}
                        />
                        {!isValid.username ? (
                            <div className={styles.warning}>
                                Your username must have at least 6 characters
                            </div>
                        ) : (
                            ''
                        )}
                        <LoginInput
                            className={!isValid.email ? styles.invalid : ''}
                            ref={emailInputRef}
                            id="email"
                            label="E-mail"
                            type="text"
                            styles={{
                                label: inputStyles.label,
                                input: inputStyles.input,
                            }}
                            input={{
                                onBlur: validateData,
                            }}
                        />
                        {!isValid.email ? (
                            <div className={styles.warning}>
                                This email is incorrect
                            </div>
                        ) : (
                            ''
                        )}
                        <LoginInput
                            className={!isValid.password ? styles.invalid : ''}
                            ref={passwordInputRef}
                            id="password"
                            label="Password"
                            type="password"
                            styles={{
                                label: inputStyles.label,
                                input: inputStyles.input,
                            }}
                            input={{
                                onBlur: validateData,
                            }}
                        />
                        {!isValid.password ? (
                            <div className={styles.warning}>
                                Password must have at least 6 characters
                            </div>
                        ) : (
                            ''
                        )}
                        <LoginInput
                            className={
                                !isValid.retypePassword ? styles.invalid : ''
                            }
                            ref={retypePasswordInputRef}
                            id="retypePassword"
                            label="Retype password"
                            type="password"
                            styles={{
                                label: inputStyles.label,
                                input: inputStyles.input,
                            }}
                            input={{
                                onBlur: validateData,
                            }}
                        />
                        {!isValid.retypePassword ? (
                            <div className={styles.warning}>
                                Passwords must be the same and must have at least 6 characters.
                            </div>
                        ) : (
                            ''
                        )}
                        <GreenButton className={styles.button} button={{ type: 'submit' }}>
                            Sign up
                        </GreenButton>
                    </form>
                    <UnvisibleButton
                        button={{ type: 'button', onClick: props.onLogin }}
                    >
                        Click here if you already have account
                    </UnvisibleButton>
                </Card>
            </div>
        </div>
    );
};
export default RegisterForm;
