import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API, CreateAxios } from '../../utils';
import { InputForm } from '../Molecules';

interface ChangePasswordProps {
    email: string;
    confirmToken: string;
}
const NEW_PASSWORD_TEXT = 'newPassword';
const NEW_PASSWORD_CHECK_TEXT = 'newPasswordConfirm';
const CHANGE_PASSWORD_TEXT = '비밀번호 변경';
const CHANGE_PASSWORD_SUCCESS_TEXT = '비밀번호 변경 성공!';
const CHANGE_PASSWORD_LABEL = 'change_password_label';
const LOGIN_URL = '/login';

export const ChangePassword = ({ email, confirmToken }: ChangePasswordProps) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        newPassword: '',
        newPasswordConfirm: ''
    });
    const { newPassword, newPasswordConfirm } = form;

    const isPasswordSame = newPassword === newPasswordConfirm;

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
            const data = {
                newPassword,
                newPasswordConfirm,
                email,
                confirmToken
            };
            await CreateAxios.patch(API.RESET_PASSWORD, data);
            alert(CHANGE_PASSWORD_SUCCESS_TEXT);
            navigate(LOGIN_URL);
        } catch (error) {
            console.log(`[Error] in ChangePassword handleSubmit method with : ${error}`);
        }
    };

    return (
        <form aria-label={ CHANGE_PASSWORD_LABEL } onSubmit={ handleSubmit }>
            <InputForm title={ NEW_PASSWORD_TEXT } value={ newPassword } type="password" onChange={ onChange } />
            <InputForm title={ NEW_PASSWORD_CHECK_TEXT } value={ newPasswordConfirm } type="password" onChange={ onChange } />
            { isPasswordSame ? <div /> : <div> 비밀번호를 확인하세요 </div> }
            <button type="submit">
                { CHANGE_PASSWORD_TEXT }
            </button>
        </form>
    );
};
