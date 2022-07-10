import React, { useState } from 'react';

const LOGIN_TEXT = '로그인';
const EMAIL_TEXT = 'email';
const PASSWORD_TEXT = 'password';

const LOGIN_LABEL = 'login_label';
const EMAIL_LABEL = 'email_label';
const PASSWORD_LABEL = 'password_label';

interface LoginFormProps {
    onSubmit: (form: { email: string; password: string }) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const { email, password } = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form aria-label={ LOGIN_LABEL } onSubmit={ handleSubmit }>
            <div>
                <div>{ EMAIL_TEXT }</div>
                <input aria-label={ EMAIL_LABEL } name="email" type="email" value={ email } onChange={ onChange } />
            </div>
            <div>
                <div>{ PASSWORD_TEXT }</div>
                <input aria-label={ PASSWORD_LABEL } name="password" type="password" value={ password } onChange={ onChange } />
            </div>
            <button type="submit">
                { LOGIN_TEXT }
            </button>
        </form>
    );
};

export default LoginForm;
