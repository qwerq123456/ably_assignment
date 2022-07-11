import { SetStateAction, Dispatch } from 'react';
import { API, CreateAxios, IssueTokenResponseType } from '../../utils';
import { InputForm } from '../Molecules';

interface RequestAuthCodeProps {
    addStepNum: () => void;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setIssueToken: Dispatch<SetStateAction<string>>;
    setRemainMillisecond: Dispatch<SetStateAction<number>>;
}
const EMAIL_TEXT = 'email';
const NEXT_TEXT = '다음';

const REQUEST_AUTH_LABEL = 'request_auth_label';

export const RequestAuthCode = (props: RequestAuthCodeProps) => {
    const {
        addStepNum, email, setEmail, setIssueToken, setRemainMillisecond
    } = props;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const IssueResponse: IssueTokenResponseType = await CreateAxios.get(`${API.RESET_PASSWORD}?email=${email}`);
            setIssueToken(IssueResponse.data.issueToken);
            setRemainMillisecond(IssueResponse.data.remainMillisecond);
            addStepNum();
        } catch (error) {
            console.log(`[Error] in RequestAuthCode handleSubmit method with : ${error}`);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    };

    return (
        <form aria-label={ REQUEST_AUTH_LABEL } onSubmit={ handleSubmit }>
            <InputForm title={ EMAIL_TEXT } value={ email } type="email" onChange={ onChange } />
            <button type="submit">
                { NEXT_TEXT }
            </button>
        </form>
    );
};
