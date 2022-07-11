import { Dispatch, SetStateAction, useState } from 'react';
import { API, ConfirmTokenResponseType, CreateAxios } from '../../utils';
import { InputForm, RemainTimeCounter } from '../Molecules';

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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setAuthCode(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <form aria-label={ VERIFY_AUTH_LABEL } onSubmit={ handleSubmit }>
            <InputForm title={ VERIFY_CODE_TEXT } value={ authCode } onChange={ onChange } />
            <RemainTimeCounter remainSecond={ remainSecond } setIsTimeOut={ setIsTimeOut } />
            <button type="submit">
                { NEXT_TEXT }
            </button>
        </form>
    );
};
