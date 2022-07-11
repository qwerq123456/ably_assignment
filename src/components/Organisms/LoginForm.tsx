import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    API, ACCESS_TOKEN_NAME, setCookie, CreateAxios, LoginResponceType
} from '../../utils';
import { InputForm } from '../Molecules';

const LOGIN_TEXT = '로그인';
const EMAIL_TEXT = 'email';
const LOGIN_SUCCESS = '로그인 성공!';
const USER_INFO_URL = '/userinfo';
const PASSWORD_TEXT = 'password';

const LOGIN_LABEL = 'login_label';

export const LoginForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const { email, password } = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const loginResponse: LoginResponceType = await CreateAxios.post(API.LOGIN, form);
            console.log(`login response : ${JSON.stringify(loginResponse)}`);
            setCookie(ACCESS_TOKEN_NAME, loginResponse.data.accessToken, { path: '/' });
            alert(LOGIN_SUCCESS);
            navigate(USER_INFO_URL);
        } catch (error) {
            console.log(`[Error] in LoginPage onSubmit method with : ${error}`);
        }
    };

    return (
        <form aria-label={ LOGIN_LABEL } onSubmit={ handleSubmit }>
            <InputForm title={ EMAIL_TEXT } value={ email } type="email" onChange={ onChange } />
            <InputForm title={ PASSWORD_TEXT } value={ password } type="password" onChange={ onChange } />
            <button type="submit">
                { LOGIN_TEXT }
            </button>
        </form>
    );
};
