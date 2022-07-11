import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    API, ACCESS_TOKEN_NAME, deleteCookie, CreateAxios, UserInfoType
} from '../../utils';
import { InfoText, UserImage } from '../Molecules';

const LOGIN_URL = '/login';
const LOGOUT_TEXT = '로그아웃';

export const UserInfoCard = () => {
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
            console.log(`[Error] in UserInfoCard getUserInfo method with : ${error}`);
            navigate(LOGIN_URL);
        }
    };
    const logout = async () => {
        try {
            await CreateAxios.post(API.LOGOUT);
            deleteCookie(ACCESS_TOKEN_NAME);
            navigate(LOGIN_URL);
        } catch (error) {
            console.log(`[Error] in UserInfoCard logout method with : ${error}`);
            navigate(LOGIN_URL);
        }
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
