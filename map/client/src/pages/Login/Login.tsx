import React, { useRef } from 'react';
import { IBasePage, IPageManager, PAGES } from '../PageManager';
import Button from '../../components/Button/Button';
import useCheckLogin from './hooks/useCheckLogin';
import './Login.scss'

const Login: React.FC<IBasePage & IPageManager> = (props) => {
    const { setPage, server } = props;
    const loginRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);
    const { isFormValid, error, setError, checkFilled, showError } = useCheckLogin();

    const hideErrorOnInput = () => {
        setError('');
        checkFilled(loginRef.current.value, passwordRef.current.value);
    };

    const loginClickHandler = async () => {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        if (!showError(login, password)) return;
        server.login(login, password);
        setPage(PAGES.LOBBY);
    }

    const registrationClickHandler = () => { setPage(PAGES.REGISTRATION) };

    return (<div className='login'>
        <div className="input-group login-group">
            <p className='p-login'>логин</p>
            <input
                ref={loginRef}
                type="text"
                placeholder="ваш логин"
                onChange={hideErrorOnInput}
                onKeyUp={() => checkFilled(loginRef.current.value, passwordRef.current.value)}
                className='input-login'
                id='test-input-login'
                autoComplete='off'
            />
        </div>

        <div className="input-group password-group">
            <p className='p-password'>пароль</p>
            <input
                ref={passwordRef}
                type="password"
                placeholder="ваш пароль"
                onChange={hideErrorOnInput}
                onKeyUp={() => checkFilled(loginRef.current.value, passwordRef.current.value)}
                className='input-password'
                id='test-input-password'
                autoComplete='off'
            />
        </div>

        {error && <p id='test-errors-login' className='p-error'>{error}</p>}
        <Button
            onClick={loginClickHandler}
            text='войти'
            isDisabled={!isFormValid}
            className='button-login'
            id='test-button-login'
        />
        <Button
            onClick={registrationClickHandler}
            text='создать учетную запись'
            className='button-registration'
            id='test-button-registration'
        />
    </div>)
}

export default Login;