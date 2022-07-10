import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config';
import { ACCESS_TOKEN_NAME, deleteCookie, getCookie } from '../../Cookies';
import { APIErrorType, CreateAxios, UserInfoType } from '../../utils/api';
import InfoText from '../Molecules/InfoText';
import UserImage from '../Molecules/UserImage';

const LOGIN_URL = '/login';
const LOGOUT_TEXT = '로그아웃';

const UserInfoCard = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        profileImage: '',
        lastConnectedAt: new Date(),
    });

    const getUserInfo = async () => {
        try {
            const userInfoResponse: UserInfoType = await CreateAxios.get(API.USER);
            setUserInfo(userInfoResponse.data);
        } catch (error) {
            const err = error as APIErrorType;
            alert(err.response.data.error.message);
            navigate(LOGIN_URL);
        }
    };
    const logout = () => {
        deleteCookie(ACCESS_TOKEN_NAME);
        navigate(LOGIN_URL);
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
            <div>
                <InfoText title="name" content={ userInfo.name } />
                <InfoText title="email" content={ userInfo.email } />
            </div>
            <UserImage url={ userInfo.profileImage } />
            <button type="button" onClick={ logout }>
                { LOGOUT_TEXT }
            </button>
        </div>
    );
};

export default UserInfoCard;
