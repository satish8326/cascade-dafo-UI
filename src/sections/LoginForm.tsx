import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import SignUpForm from '../components/SignUpForm';
import NameSearchForm from '../components/NameSearchForm';
import AccountValidationForm from '../components/AccountValidationForm';
import OtpVerificationForm from '../components/OtpVerificationForm';
import LoginSuccess from '../components/LoginSuccess';
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

const initialLoginValues: LoginFormValues = {
  username: '',
  password: ''
};

const LoginForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isNameSearch, setIsNameSearch] = useState<boolean>(false);
  const [isAccountValidation, setIsAccountValidation] = useState<boolean>(false);
  const [isOtpVerification, setIsOtpVerification] = useState<boolean>(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false);
  const [loginValues, setLoginValues] = useState<LoginFormValues>(initialLoginValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginChange = (field: keyof LoginFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginValues(prev => ({ ...prev, [field]: event.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateLogin = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!loginValues.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!loginValues.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validateLogin()) {
      return;
    }

    const run = async () => {
      setIsSubmitting(true);
      try {
        await login(loginValues.username);
        navigate('/dashboard', { replace: true });
      } finally {
        setIsSubmitting(false);
      }
    };

    void run();
  };

  const handleSignUpSubmit = async (values: { firstName: string; lastName: string; phone: string; email: string }): Promise<void> => {
    void values;
    setIsSignUp(false);
    setIsOtpVerification(true);
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isLabelFloating = (field: string) => {
    return focusedField === field || loginValues[field as keyof typeof loginValues]?.length > 0;
  };

  const handleFocus = (field: string) => () => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const toggleForm = () => {
    setIsSignUp(false);
    setIsNameSearch(false);
    setIsAccountValidation(!isAccountValidation);
    setIsOtpVerification(false);
    setIsSignUpSuccess(false);
    setErrors({});
    setFocusedField(null);
  };

  const toggleFormToLogin = () => {
    setIsAccountValidation(false);
    setIsSignUpSuccess(false);
    setErrors({});
    
  };

  const handleNameSearchSubmit = async (selectedName: string) : Promise<void> => {
    setIsSubmitting(true);
    try {
      void selectedName;
      setIsOtpVerification(false);
      setIsSignUpSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccountValidationSubmit = async (values: { accountNumber: string; billingZipCode: string }): Promise<void> => {
    void values;
    setIsAccountValidation(false);
    setIsSignUp(false);
    setIsNameSearch(true);
  };

  const handleOtpSubmit = async (values: { method: 'email' | 'phone'; code: string }): Promise<void> => {
    setIsSubmitting(true);
    try {
      void values;
      setIsOtpVerification(false);
      setIsSignUpSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterAsNew = async () => {
    setIsNameSearch(false);
    setIsSignUp(true);
  };

  if (isSignUpSuccess) {
    return (
      <LoginSuccess
        onGoToLogin={toggleFormToLogin}
      />
    );
  }

  if (isOtpVerification) {
    return (
      <OtpVerificationForm
        onSubmit={handleOtpSubmit}
        onToggleToLogin={toggleForm}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isAccountValidation) {
    return (
      <AccountValidationForm
        onSubmit={handleAccountValidationSubmit}
        onToggleToLogin={toggleForm}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isNameSearch) {
    return (
      <NameSearchForm
        onSubmit={handleNameSearchSubmit}
        onToggleToLogin={toggleForm}
        onRegisterAsNew={handleRegisterAsNew}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isSignUp) {
    return (
      <Box>
        <SignUpForm
          onSubmit={handleSignUpSubmit}
          onToggleToLogin={toggleForm}
          isSubmitting={isSubmitting}
        />

      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleLoginSubmit} noValidate>
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
          value={loginValues.username}
          onChange={handleLoginChange('username')}
          onFocus={handleFocus('username')}
          onBlur={handleBlur}
          error={Boolean(errors.username)}
          helperText={errors.username}
          inputProps={{ 'aria-label': 'Username' }}
          sx={{
            '& .MuiInputBase-root': {
              height: 46,
            },
            '& .MuiInputBase-input': {
              padding: '10px 10px',
              fontSize: '14px',
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
          value={loginValues.password}
          onChange={handleLoginChange('password')}
          onFocus={handleFocus('password')}
          onBlur={handleBlur}
          error={Boolean(errors.password)}
          helperText={errors.password}
          inputProps={{ 'aria-label': 'Password' }}
          sx={{
            '& .MuiInputBase-root': {
              height: 46,
            },
            '& .MuiInputBase-input': {
              padding: '10px 10px',
              fontSize: '14px',
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

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: '8px'
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
          onClick={toggleForm}
        >
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
