import { useState } from 'react';

import { RequestAuthCode, VerifyAuthCode, ChangePassword } from '../..';

export const ResetPasswordPage = () => {
    const [stepNum, setStepNum] = useState(0);
    const [email, setEmail] = useState('');
    const [issueToken, setIssueToken] = useState('');
    const [remainMillisecond, setRemainMillisecond] = useState(0);
    const [confirmToken, setConfirmToken] = useState('');

    const addStepNum = () => {
        setStepNum(stepNum + 1);
    };

    const resetStepNum = () => {
        setStepNum(0);
    };

    const RequestAuthCodeProps = {
        addStepNum,
        email,
        setEmail,
        setIssueToken,
        setRemainMillisecond
    };

    const VerifyAuthCodeProps = {
        resetStepNum,
        addStepNum,
        email,
        issueToken,
        remainMillisecond,
        setConfirmToken,
    };

    const ChangePasswordProps = {
        email,
        confirmToken
    };

    if (stepNum === 0) return (<RequestAuthCode { ...RequestAuthCodeProps } />);
    if (stepNum === 1) return (<VerifyAuthCode { ...VerifyAuthCodeProps } />);
    return (<ChangePassword { ...ChangePasswordProps } />);
};
