import { SetStateAction, Dispatch } from 'react';
import { API, CreateAxios, IssueTokenResponseType } from '../../utils';
import {
    Button, Form, Input
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

export const RequestAuthCode = (props: RequestAuthCodeProps) => {
    const {
        addStepNum, setEmail, setIssueToken, setRemainMillisecond
    } = props;

    const [form] = Form.useForm();

    const onFinish = async (values: { email: string }) => {
        try {
            const IssueResponse: IssueTokenResponseType = await CreateAxios.get(`${API.RESET_PASSWORD}?email=${values.email}`);
            setIssueToken(IssueResponse.data.issueToken);
            setRemainMillisecond(IssueResponse.data.remainMillisecond);
            addStepNum();
        } catch (error) {
            console.log(`[Error] in RequestAuthCode handleSubmit method with : ${error}`);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        form.setFieldsValue({ ...form, [name]: value });
        setEmail(value);
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
