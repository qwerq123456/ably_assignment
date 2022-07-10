import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from '../../../src/components/Organisms/LoginForm';

const LOGIN_TEXT = '로그인';
const TEST_EMAIL = 'test@test.mail';
const TEST_PASSWORD = 'test_password';
const LOGIN_LABEL = 'login_label';
const EMAIL_LABEL = 'email_label';
const PASSWORD_LABEL = 'password_label';

const mockOnSubmit = jest.fn();

describe('LoginForm Test', () => {
    render(<LoginForm onSubmit={ mockOnSubmit } />);

    const form = screen.getByLabelText(LOGIN_LABEL);
    const emailInput = screen.getByLabelText(EMAIL_LABEL);
    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);
    const loginButton = screen.getByText(LOGIN_TEXT);

    test('should LoginForm email and password input works well and login button works well', () => {
        expect(form).toHaveFormValues({
            email: '',
            password: '',
        });

        fireEvent.change(emailInput, { target: { value: TEST_EMAIL } });
        expect(form).toHaveFormValues({
            email: TEST_EMAIL,
            password: '',
        });

        fireEvent.change(passwordInput, { target: { value: TEST_PASSWORD } });
        expect(form).toHaveFormValues({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        });

        fireEvent.click(loginButton);
        expect(mockOnSubmit).toBeCalledWith({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        });
    });
});
