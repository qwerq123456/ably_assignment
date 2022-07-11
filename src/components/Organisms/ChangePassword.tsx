import {
    Layout, Form, Input, Button
} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    API, CreateAxios, FormLayout, FormStyle
} from '../../utils';

interface ChangePasswordProps {
    email: string;
    confirmToken: string;
}
const NEW_PASSWORD_TEXT = 'newPassword';
const NEW_PASSWORD_CHECK_TEXT = 'newPasswordConfirm';
const CHANGE_PASSWORD_TEXT = '비밀번호 변경';
const CHANGE_PASSWORD_SUCCESS_TEXT = '비밀번호 변경 성공!';
const LOGIN_URL = '/login';
const PLEASE_ENTER_NEW_PASSWORD = '새 비밀번호를 입력해주세요!';
const PASSWORD_HAS_TO_SAME = '두 비밀번호가 같아야 합니다!';
export const ChangePassword = ({ email, confirmToken }: ChangePasswordProps) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        form.setFieldsValue({ ...form, [name]: value });
    };

    const onFinish = async (values: { newPassword: string; newPasswordConfirm: string }) => {
        const { newPassword, newPasswordConfirm } = values;
        setLoading(true);
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
        setLoading(false);
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
                    name={ NEW_PASSWORD_TEXT }
                    label={ NEW_PASSWORD_TEXT }
                    rules={ [
                        {
                            required: true,
                            message: PLEASE_ENTER_NEW_PASSWORD,
                        },
                    ] }
                    hasFeedback
                >
                    <Input.Password onChange={ onChange } />
                </Form.Item>

                <Form.Item
                    name={ NEW_PASSWORD_CHECK_TEXT }
                    label={ NEW_PASSWORD_CHECK_TEXT }
                    dependencies={ [NEW_PASSWORD_TEXT] }
                    hasFeedback
                    rules={ [
                        {
                            required: true,
                            message: PLEASE_ENTER_NEW_PASSWORD,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue(NEW_PASSWORD_TEXT) === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error(PASSWORD_HAS_TO_SAME));
                            },
                        }),
                    ] }
                >
                    <Input.Password onChange={ onChange } />
                </Form.Item>
                <Form.Item>
                    <Button loading={ loading } htmlType="submit">{ CHANGE_PASSWORD_TEXT }</Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};
