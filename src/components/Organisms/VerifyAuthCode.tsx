import { Dispatch, SetStateAction, useState } from 'react';
import { API, ConfirmTokenResponseType, CreateAxios } from '../../utils';
import { InputForm, RemainTimeCounter } from '../Molecules';
import {
    Button, Form, Input
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

const VERIFY_AUTH_LABEL = 'verify_auth_label';
export const VerifyAuthCode = (props: VerifyAuthCodeProps) => {
    const {
        resetStepNum, addStepNum, issueToken, remainMillisecond, email, setConfirmToken
    } = props;
    const remainSecond = remainMillisecond / 1000;

    const [authCode, setAuthCode] = useState('');
    const [isTimeOut, setIsTimeOut] = useState(false);

    const [form] = Form.useForm();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        form.setFieldsValue({ ...form, [name]: value });
        setAuthCode(value);
    };

    const onFinish = async (values: { authCode: string }) => {
        try {
            console.log(`isTimeOut : ${isTimeOut}`);
            if (isTimeOut) {
                resetStepNum();
                alert('인증 시간 초과');
                return;
            }
            const data = {
                email,
                issueToken,
                authCode,
            };
            const confirmResponse: ConfirmTokenResponseType = await CreateAxios.post(API.RESET_PASSWORD, data);
            setConfirmToken(confirmResponse.data.confirmToken);
            console.log(`confirmToken : ${confirmResponse.data.confirmToken}`);
            addStepNum();
        } catch (error) {
            console.log(`[Error] in VerifyAuthCode handleSubmit method with : ${error}`);
        }
    };

    return (
        <Form
            form={ form }
            colon={ false }
            labelCol={ {
                span: 4,
            } }
            wrapperCol={ {
                span: 16,
            } }
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
                        message: '인증코드를 입력해주세요',
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
                <Button htmlType="submit">{ NEXT_TEXT }</Button>
            </Form.Item>
        </Form>
    );
};
