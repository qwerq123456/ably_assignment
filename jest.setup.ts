jest.mock('./src/Cookies', () => ({
    setCookie: jest.fn(),
    getCookie: jest.fn()
}));
