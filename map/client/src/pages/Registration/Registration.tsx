import React, { useRef } from 'react';
import { IBasePage, IPageManager, PAGES } from '../PageManager';
import { TError } from '../../services/server/types';
import Button from '../../components/Button/Button';
import useChecRegistration from './hooks/useCheckRegistration';
import './Registration.scss';

const Registration: React.FC<IBasePage & IPageManager> = (props) => {
    const { setPage, server } = props;
    const loginRef = useRef<HTMLInputElement>(null!);
    const nicknameRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);
    const confirmPasswordRef = useRef<HTMLInputElement>(null!);
    const { isFormValid, error, setError, checkFilled, showError } = useChecRegistration();

    const hideErrorOnInput = () => {
        setError('');
        checkFilled(loginRef.current.value, nicknameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value);
    };

    const registrationClickHandler = async () => {
        const login = loginRef.current.value;
        const nickname = nicknameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!showError(login, nickname, password, confirmPassword)) return;

        server.registration(login, password, nickname);
        setPage(PAGES.LOGIN);
    }

    const haveAccountClickHandler = () => {
        setPage(PAGES.LOGIN)
    }

    return (<div className='registration'>
        <div className='registration-wrapper'>
            <p className='registration-label-log'>логин</p>
            <input
                ref={loginRef}
                type="text"
                placeholder="ваш логин"
                onChange={hideErrorOnInput}
                onKeyUp={() => checkFilled(loginRef.current.value, nicknameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)}
                className='input-loginReg'
                id='test-input-loginReg'
                autoComplete='off'
            />
            <p className='registration-label-nick'>никнейм</p>
            <input
                ref={nicknameRef}
                type="text"
                placeholder="ваш никнейм"
                onChange={hideErrorOnInput}
                onKeyUp={() => checkFilled(loginRef.current.value, nicknameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)}
                className='input-nicknameReg'
                id='test-input-nicknameReg'
                autoComplete='off'
            />
            <p className='registration-label-pass'>пароль</p>
            <input
                ref={passwordRef}
                type="password"
                placeholder="ваш пароль"
                onChange={hideErrorOnInput}
                onKeyUp={() => checkFilled(loginRef.current.value, nicknameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)}
                className='input-passwordReg'
                id='test-input-passwordReg'
                autoComplete='off'
            />
            <p className='registration-label-certpass'>подтверждение пароля</p>
            <input
                ref={confirmPasswordRef}
                type="password"
                placeholder="повторите ваш пароль"
                onChange={hideErrorOnInput}
                onKeyUp={() => checkFilled(loginRef.current.value, nicknameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)}
                className='input-certpasswordReg'
                id='test-input-certpasswordReg'
                autoComplete='off'
            />
            <div>
            </div>
            {error && <div id='test-errors-registration' className='errors'>{error}</div>}
            <div className='registration-buttons'>
                <Button
                    onClick={registrationClickHandler}
                    text='зарегистрироваться'
                    isDisabled={!isFormValid}
                    className='registration-button'
                    id='test-registration-button'
                />
                <Button
                    onClick={haveAccountClickHandler}
                    text='есть аккаунт?'
                    className='haveAccount-Button'
                    id='test-haveAccount-Button'
                />
            </div>
        </div>
    </div>)
}

export default Registration;