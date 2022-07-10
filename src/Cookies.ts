import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const ACCESS_TOKEN_NAME = 'access_token_name';

export interface setCookieProps {
    name: string;
    value: string;
    option: CookieSetOptions;
}

export const setCookie = (name: string, value: string, option: CookieSetOptions) => {
    return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const deleteCookie = (name: string) => {
    return cookies.remove(name);
};
