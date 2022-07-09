import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './Pages/Login/LoginPage';
import ResetPasswordPage from './Pages/ResetPassword/ResetPasswordPage';
import UserInfoPage from './Pages/UserInfoPage/UserInfoPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/reset-password" element={ <ResetPasswordPage /> } />
                    <Route path="/userinfo" element={ <UserInfoPage /> } />
                </Routes>
            </div>
        </BrowserRouter>

    );
};

export default App;
