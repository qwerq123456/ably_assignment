import {
    BrowserRouter, Routes, Route, Navigate
} from 'react-router-dom';

import { LoginPage, ResetPasswordPage, UserInfoPage } from './components';
import { ACCESS_TOKEN_NAME, getCookie } from './utils';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="*"
                        element={ <Navigate to={ getCookie(ACCESS_TOKEN_NAME) ? '/userinfo' : '/login' } /> }
                    />
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/reset-password" element={ <ResetPasswordPage /> } />
                    <Route path="/userinfo" element={ <UserInfoPage /> } />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
