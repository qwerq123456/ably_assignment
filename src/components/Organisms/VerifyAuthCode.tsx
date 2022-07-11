import { Dispatch, SetStateAction, useState } from 'react';
import {
    API, ConfirmTokenResponseType, CreateAxios, FormLayout, FormStyle
} from '../../utils';
import { RemainTimeCounter } from '../Molecules';
import {
    Button, Form, Input, Layout
} from 'antd';
import 'antd/dist/antd.css';

interface VerifyAuthCodeProps {
    resetStepNum: () => void;
    addStepNum: () => void;
    email: string;
    issueToken: string;
    remainMillisecond: number;
    setConfirmToken: Dispatch<SetStateAction<string>>;
}

const VERIFY_CODE_TEXT = '인증코드';
const NEXT_TEXT = '다음';
const TIME_OVER_ALERT = '인증 시간 초과';
const PLEASE_ENTER_AUTHCODE = '인증코드를 입력해주세요';

export const VerifyAuthCode = (props: VerifyAuthCodeProps) => {
    const {
        resetStepNum, addStepNum, issueToken, remainMillisecond, email, setConfirmToken
    } = props;
    const remainSecond = remainMillisecond / 1000;

    const [authCode, setAuthCode] = useState('');
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        form.setFieldsValue({ ...form, [name]: value });
        setAuthCode(value);
    };

    const onFinish = async () => {
        setLoading(true);
        try {
            if (isTimeOut) {
                resetStepNum();
                alert(TIME_OVER_ALERT);
                return;
            }
            const data = {
                email,
                issueToken,
                authCode,
            };
            const confirmResponse: ConfirmTokenResponseType = await CreateAxios.post(API.RESET_PASSWORD, data);
            setConfirmToken(confirmResponse.data.confirmToken);
            addStepNum();
        } catch (error) {
            console.log(`[Error] in VerifyAuthCode handleSubmit method with : ${error}`);
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
                } }
                onFinish={ onFinish }
            >
                <Form.Item
                    label={ VERIFY_CODE_TEXT }
                    name="authCode"
                    rules={ [
                        {
                            required: true,
                            message: PLEASE_ENTER_AUTHCODE,
                        },
                    ] }
                >
                    <Input onChange={ onChange } />
                </Form.Item>
                <Form.Item wrapperCol={ {
                    offset: 4,
                    span: 16,
                } }
                >
                    <RemainTimeCounter remainSecond={ remainSecond } setIsTimeOut={ setIsTimeOut } />
                </Form.Item>
                <Form.Item wrapperCol={ {
                    offset: 4,
                    span: 16,
                } }
                >
                    <Button loading={ loading } htmlType="submit">{ NEXT_TEXT }</Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};
