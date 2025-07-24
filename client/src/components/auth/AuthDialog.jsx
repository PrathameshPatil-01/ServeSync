// src/components/auth/AuthDialog.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Tabs, Tab } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { closeAuthDialog, setAuthMode } from '../../features/auth/authSlice';

export default function AuthDialog() {
    const { isAuthDialogOpen, authMode } = useSelector((s) => s.auth);
    const dispatch = useDispatch();

    return (
        <Dialog open={isAuthDialogOpen} onClose={() => dispatch(closeAuthDialog())}>
            <DialogContent>
                {authMode !== 'forgot' && (
                    <Tabs value={authMode} onChange={(_, val) => dispatch(setAuthMode(val))} centered>
                        <Tab label="Login" value="login" />
                        <Tab label="Signup" value="signup" />
                    </Tabs>
                )}
                {authMode === 'login' && <LoginForm />}
                {authMode === 'signup' && <SignupForm />}
                {authMode === 'forgot' && <ForgotPasswordForm />}
            </DialogContent>
        </Dialog>
    );
}
