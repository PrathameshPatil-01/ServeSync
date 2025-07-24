// src/components/auth/LoginForm.jsx
import { Button, TextField, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser, setAuthMode } from '../../redux/auth/authSlice';

export default function LoginForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((s) => s.auth);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
            })}
            onSubmit={(values) => dispatch(loginUser(values))}
        >
            {({ handleChange, handleSubmit, errors, touched }) => (
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        fullWidth
                    />
                    <Typography
                        onClick={() => dispatch(setAuthMode('forgot'))}
                        sx={{ cursor: 'pointer', textAlign: 'right', fontSize: 14 }}
                    >
                        Forgot Password?
                    </Typography>
                    <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            )}
        </Formik>
    );
}
