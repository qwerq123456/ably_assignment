import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    API, ACCESS_TOKEN_NAME, deleteCookie, CreateAxios, UserInfoType, UserInfoCardLayout
} from '../../utils';

import {
    Descriptions, Layout, Space, Button, Image
} from 'antd';

const LOGIN_URL = '/login';
const LOGOUT_TEXT = '로그아웃';
const USER_INFO_TITLE = '유저 정보';
const NAME_TEXT = 'name';
const EMAIL_TEXT = 'email';

export const UserInfoCard = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        profileImage: '',
        lastConnectedAt: new Date(),
    });
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            await CreateAxios.post(API.LOGOUT);
            deleteCookie(ACCESS_TOKEN_NAME);
        } catch (error) {
            console.log(`[Error] in UserInfoCard logout method with : ${error}`);
        }
        setLoading(false);

        navigate(LOGIN_URL);
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    return (

        <Layout style={ UserInfoCardLayout }>
            <Space style={ { maxWidth: 600, height: 300 } }>
                <Descriptions layout="horizontal" title={ USER_INFO_TITLE }>
                    <Descriptions.Item label={ NAME_TEXT }>{ userInfo.name }</Descriptions.Item>
                    <Descriptions.Item label={ EMAIL_TEXT }>{ userInfo.email }</Descriptions.Item>
                </Descriptions>
                <Image src={ userInfo.profileImage } style={ { width: 200 } } />
            </Space>
            <Button loading={ loading } htmlType="button" onClick={ logout } style={ { marginTop: 30, width: 100 } }>
                { LOGOUT_TEXT }
            </Button>
        </Layout>
    );
};
