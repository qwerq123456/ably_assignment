import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../..';

const PASSWORD_CHANGE_TEXT = '비밀번호 변경';
const RESET_PASSWORD_URL = '/reset-password';

export const LoginPage = () => {
    const navigate = useNavigate();

    const onClickPasswordChangeButton = () => {
        navigate(RESET_PASSWORD_URL);
    };

    return (
        <div className="LoginPage">
            <LoginForm />
            <button type="button" onClick={ onClickPasswordChangeButton }>
                { PASSWORD_CHANGE_TEXT }
            </button>
        </div>
    );
};
