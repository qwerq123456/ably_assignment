import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './config';
import { ACCESS_TOKEN_NAME, getCookie } from './Cookies';

export const CreateAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`
    }
});

CreateAxios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.headers!.Authorization = `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

CreateAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const err = error as APIErrorType;
        alert(err.response.data.error.message);
    }
);
interface APIErrorType {
    response: {
        data: {
            error: {
                message: string;
            }
        }
    }
}

export interface LoginResponceType {
    data: {
        accessToken: string;
    }
}

export interface UserInfoType {
    data: {
        name: string;
        email: string;
        profileImage: string;
        lastConnectedAt: Date;
    }
}

export interface IssueTokenResponseType {
    data: {
        issueToken: string,
        remainMillisecond: number,
    }
}

export interface ConfirmTokenResponseType {
    data: {
        confirmToken: string;
    }
}
