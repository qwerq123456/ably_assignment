import { SetStateAction, Dispatch, useState } from 'react';
import {
    API, CreateAxios, FormLayout, FormStyle, IssueTokenResponseType
} from '../../utils';
import {
    Button, Form, Input, Layout
} from 'antd';
import 'antd/dist/antd.css';

interface RequestAuthCodeProps {
    addStepNum: () => void;
    setEmail: Dispatch<SetStateAction<string>>;
    setIssueToken: Dispatch<SetStateAction<string>>;
    setRemainMillisecond: Dispatch<SetStateAction<number>>;
}
const EMAIL_TEXT = 'email';
const NEXT_TEXT = '다음';
const PLEASE_ENTER_EMAIL = '이메일을 입력해주세요';
const PLEASE_ENTER_EMAIL_FORMAT = '이메일 형식으로 써주세요';

export const RequestAuthCode = (props: RequestAuthCodeProps) => {
    const {
        addStepNum, setEmail, setIssueToken, setRemainMillisecond
    } = props;

    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            const IssueResponse: IssueTokenResponseType = await CreateAxios.get(`${API.RESET_PASSWORD}?email=${values.email}`);
            setIssueToken(IssueResponse.data.issueToken);
            setRemainMillisecond(IssueResponse.data.remainMillisecond);
            addStepNum();
        } catch (error) {
            console.log(`[Error] in RequestAuthCode handleSubmit method with : ${error}`);
        }
        setLoading(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        form.setFieldsValue({ ...form, [name]: value });
        setEmail(value);
    };

    return (
        <Layout style={ FormLayout }>
            <Form
                form={ form }
                colon={ false }
                style={ FormStyle }
                initialValues={ {
                    email: '',
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
