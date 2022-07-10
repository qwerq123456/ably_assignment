import { useNavigate } from 'react-router-dom';

import LoginForm from '../../components/Organisms/LoginForm';
import { CreateAxios, LoginResponceType, APIErrorType } from '../../utils/api';
import { API } from '../../config';
import {
    ACCESS_TOKEN_NAME, getCookie, setCookie
} from '../../Cookies';

const PASSWORD_CHANGE_TEXT = '비밀번호 변경';
const LOGIN_SUCCESS = '로그인 성공!';
const USER_INFO_URL = '/userinfo';
const RESET_PASSWORD_URL = '/reset-password';

const LoginPage = () => {
    const navigate = useNavigate();

    const onSubmit = async (form: { email: string; password: string; }) => {
        try {
            const loginResponse: LoginResponceType = await CreateAxios.post(API.LOGIN, form);
            setCookie(ACCESS_TOKEN_NAME, loginResponse.data.accessToken, { path: '/' });
            alert(LOGIN_SUCCESS);
            navigate(USER_INFO_URL);
        } catch (error) {
            const err = error as APIErrorType;
            alert(err.response.data.error.message);
        }
    };

    const onClickPasswordChangeButton = () => {
        navigate(RESET_PASSWORD_URL);
    };

    return (
        <div className="LoginPage">
            <LoginForm onSubmit={ onSubmit } />
            <button type="button" onClick={ onClickPasswordChangeButton }>
                { PASSWORD_CHANGE_TEXT }
            </button>
        </div>
    );
};

export default LoginPage;
