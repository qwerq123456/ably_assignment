import {
    render, fireEvent, screen
} from '@testing-library/react';
import LoginPage from '../../../src/Pages/Login/LoginPage';

const PASSWORD_CHANGE_TEXT = '비밀번호 변경';
const RESET_PASSWORD_URL = '/reset-password';

const mockedNavigator = jest.fn();
const mockSetCookie = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedNavigator
}));

jest.mock('axios');

jest.mock('../../../src/Cookies', () => ({
    setCookie: mockSetCookie,
}));

describe('LoginPage test', () => {
    render(<LoginPage />);
    const passwordChangeButton = screen.getByText(PASSWORD_CHANGE_TEXT);
    test('should password change button navigate to reset password page', () => {
        fireEvent.click(passwordChangeButton);
        expect(mockedNavigator).toBeCalledWith(RESET_PASSWORD_URL);
    });
    test('should fetch data successfully from API');
    test('should handle error with error from API');
});
