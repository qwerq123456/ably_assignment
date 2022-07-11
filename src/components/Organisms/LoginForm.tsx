import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    API, ACCESS_TOKEN_NAME, setCookie, CreateAxios, LoginResponceType, FormStyle, FormLayout
} from '../../utils';
import {
    Button, Form, Input, Layout
} from 'antd';
import 'antd/dist/antd.css';

const LOGIN_TEXT = '로그인';
const EMAIL_TEXT = 'email';
const LOGIN_SUCCESS = '로그인 성공!';
const USER_INFO_URL = '/userinfo';
const PASSWORD_TEXT = 'password';

const PASSWORD_CHANGE_TEXT = '비밀번호 변경';
const RESET_PASSWORD_URL = '/reset-password';

const PLEASE_ENTER_EMAIL = '이메일을 입력해주세요';
const PLEASE_ENTER_EMAIL_FORMAT = '이메일 형식으로 써주세요';
const PLEASE_ENTER_PASSWORD = '비밀번호를 입력해주세요';
export const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const loginResponse: LoginResponceType = await CreateAxios.post(API.LOGIN, values);
            console.log(`login response : ${JSON.stringify(loginResponse)}`);
            setCookie(ACCESS_TOKEN_NAME, loginResponse.data.accessToken, { path: '/' });
            alert(LOGIN_SUCCESS);
            navigate(USER_INFO_URL);
        } catch (error) {
            console.log(`[Error] in LoginPage onSubmit method with : ${error}`);
        }
        setLoading(false);
    };

    const onClickPasswordChangeButton = () => {
        navigate(RESET_PASSWORD_URL);
    };
    const [form] = Form.useForm();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        form.setFieldsValue({ ...form, [name]: value });
    };
    return (
        <Layout style={ FormLayout }>
            <Form
                style={ FormStyle }
                form={ form }
                colon={ false }
                initialValues={ {
                    email: '',
                    password: '',
                } }
                onFinish={ onFinish }
            >
                <Form.Item
                    label={ EMAIL_TEXT }
                    name={ EMAIL_TEXT }
                    rules={ [
                        {
                            required: true,
                            message: PLEASE_ENTER_EMAIL,
                        },
                        {
                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: PLEASE_ENTER_EMAIL_FORMAT,
                        },
                    ] }
                >
                    <Input onChange={ onChange } />
                </Form.Item>
                <Form.Item
                    label={ PASSWORD_TEXT }
                    name={ PASSWORD_TEXT }
                    rules={ [
                        {
                            required: true,
                            message: PLEASE_ENTER_PASSWORD,
                        },
                    ] }
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button loading={ loading } htmlType="submit">{ LOGIN_TEXT }</Button>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="button" onClick={ onClickPasswordChangeButton }>{ PASSWORD_CHANGE_TEXT }</Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};
