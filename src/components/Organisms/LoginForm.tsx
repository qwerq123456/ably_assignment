import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    API, ACCESS_TOKEN_NAME, setCookie, CreateAxios, LoginResponceType
} from '../../utils';
import {
    Button, Form, Input
} from 'antd';
import 'antd/dist/antd.css';

const LOGIN_TEXT = '로그인';
const EMAIL_TEXT = 'email';
const LOGIN_SUCCESS = '로그인 성공!';
const USER_INFO_URL = '/userinfo';
const PASSWORD_TEXT = 'password';

const PASSWORD_CHANGE_TEXT = '비밀번호 변경';
const RESET_PASSWORD_URL = '/reset-password';

export const LoginForm = () => {
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const loginResponse: LoginResponceType = await CreateAxios.post(API.LOGIN, values);
            console.log(`login response : ${JSON.stringify(loginResponse)}`);
            setCookie(ACCESS_TOKEN_NAME, loginResponse.data.accessToken, { path: '/' });
            alert(LOGIN_SUCCESS);
            navigate(USER_INFO_URL);
        } catch (error) {
            console.log(`[Error] in LoginPage onSubmit method with : ${error}`);
        }
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
        <Form
            form={ form }
            name={ LOGIN_TEXT }
            colon={ false }
            labelCol={ {
                span: 4,
            } }
            wrapperCol={ {
                span: 16,
            } }
            initialValues={ {
                email: '',
                password: '',
            } }
            onFinish={ onFinish }
        >
            <Form.Item
                label="Email"
                name={ EMAIL_TEXT }
                rules={ [
                    {
                        required: true,
                        message: '이메일을 입력해주세요',
                    },
                    {
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: '이메일 형식으로 써주세요',
                    },
                ] }
            >
                <Input onChange={ onChange } />
            </Form.Item>
            <Form.Item
                label="Password"
                name={ PASSWORD_TEXT }
                rules={ [
                    {
                        required: true,
                        message: '비밀번호를 입력해주세요',
                    },
                ] }
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={ {
                offset: 4,
                span: 16,
            } }
            >
                <Button htmlType="submit">{ LOGIN_TEXT }</Button>
            </Form.Item>
            <Form.Item wrapperCol={ {
                offset: 4,
                span: 16,
            } }
            >
                <Button htmlType="button" onClick={ onClickPasswordChangeButton }>{ PASSWORD_CHANGE_TEXT }</Button>
            </Form.Item>
        </Form>
    );
};
