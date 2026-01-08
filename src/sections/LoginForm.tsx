import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginFormValues {
  username: string;
  password: string;
}

interface FieldErrors {
  username?: string;
  password?: string;
}

const initialValues: LoginFormValues = {
  username: '',
  password: ''
};

const LoginForm: React.FC = () => {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (field: keyof LoginFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!values.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!values.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const run = async () => {
      setIsSubmitting(true);
      try {
        await login(values.username);
        navigate('/dashboard', { replace: true });
      } finally {
        setIsSubmitting(false);
      }
    };

    void run();
  };
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isLabelFloating = (field: string) => {
    return focusedField === field || values[field as keyof typeof values].length > 0;
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'left',
          mt: 1,
          mb: 1

        }}
      >
        Login
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('username') ? 8 : '24%',
            transform: isLabelFloating('username') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: isLabelFloating('username') ? '0.75rem' : '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Username
        </Typography>
        <FormInput
          name="username"
          label=""
          type="email"
          autoComplete="email"
          value={values.username}
          onChange={handleChange('username')}
          error={Boolean(errors.username)}
          helperText={errors.username}
          inputProps={{ 'aria-label': 'Username' }}
         sx={{
            '& .MuiInputBase-root': {
              height: 46,
            },
            '& .MuiInputBase-input': {
              padding: '10px 10px',
              fontSize: '14px', // ✅ correct place
            },
          }}
        />
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('password') ? 8 : '24%',
            transform: isLabelFloating('password') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: isLabelFloating('password') ? '0.75rem' : '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Password
        </Typography>
        <FormInput
          name="password"
          label=""
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange('password')}
          error={Boolean(errors.password)}
          helperText={errors.password}
          inputProps={{ 'aria-label': 'Password' }}
          sx={{
            '& .MuiInputBase-root': {
              height: 46,
            },
            '& .MuiInputBase-input': {
              padding: '10px 10px',
              fontSize: '14px', // ✅ correct place
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 1,
          mb: 1
        }}
      >
        <Link
          component="button"
          type="button"
          underline="hover"
          sx={{
            fontSize: 12,
            color: '#d32f2f',
            mb: 1,
            fontWeight: 500
          }}
          onClick={() => {
            // placeholder for navigation
          }}
        >
          Forgot your Password?
        </Link>
      </Box>

      <PrimaryButton type="submit" disabled={isSubmitting}
      sx={{
        fontSize: 16, // ✅ adjust font size
        fontWeight: 500, // ✅ make text bold
    borderRadius: '8px', // ✅ add radius

  }}
      >
        {isSubmitting ? 'Logging in…' : 'Login'}
      </PrimaryButton>

      <Box
        sx={{
          mt: 2,
          textAlign: 'center',
          fontSize: 13
        }}
      >
        <span>Don&apos;t have an account? </span>
        <Link
          component="button"
          type="button"
          underline="hover"
          sx={{ fontWeight: 600, fontSize: 13 }}
          onClick={() => {
            // placeholder for sign-up navigation
          }}
        >
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;


