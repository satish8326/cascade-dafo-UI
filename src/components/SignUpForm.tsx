import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
  onToggleToLogin: () => void;
  isSubmitting: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onToggleToLogin, isSubmitting }) => {
  const [values, setValues] = useState<SignUpFormValues>({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof SignUpFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!values.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    void onSubmit(values);
  };

  const isLabelFloating = (field: string) => {
    return focusedField === field || values[field as keyof typeof values]?.length > 0;
  };

  const handleFocus = (field: string) => () => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer'
        }}
        onClick={onToggleToLogin}
      >
        <ArrowBackIcon sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            fontSize: 18,
            textAlign: 'left'
          }}
        >
          Sign up
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ position: 'relative', flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              left: 16,
              top: isLabelFloating('firstName') ? 8 : '24%',
              transform: isLabelFloating('firstName') ? 'translateY(0)' : 'translateY(-50%)',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: 'background.paper',
              px: 0.5,
              color: 'text.secondary',
              fontSize: '0.75rem',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            First Name
          </Typography>
          <FormInput
            name="firstName"
            label=""
            type="text"
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange('firstName')}
            onFocus={handleFocus('firstName')}
            onBlur={handleBlur}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            inputProps={{ 'aria-label': 'First Name' }}
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

        <Box sx={{ position: 'relative', flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              left: 16,
              top: isLabelFloating('lastName') ? 8 : '24%',
              transform: isLabelFloating('lastName') ? 'translateY(0)' : 'translateY(-50%)',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: 'background.paper',
              px: 0.5,
              color: 'text.secondary',
              fontSize: '0.75rem',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            Last Name
          </Typography>
          <FormInput
            name="lastName"
            label=""
            type="text"
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange('lastName')}
            onFocus={handleFocus('lastName')}
            onBlur={handleBlur}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            inputProps={{ 'aria-label': 'Last Name' }}
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
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('phone') ? 8 : '24%',
            transform: isLabelFloating('phone') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Phone
        </Typography>
        <FormInput
          name="phone"
          label=""
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange('phone')}
          onFocus={handleFocus('phone')}
          onBlur={handleBlur}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          inputProps={{ 'aria-label': 'Phone' }}
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
            top: isLabelFloating('email') ? 8 : '24%',
            transform: isLabelFloating('email') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Email
        </Typography>
        <FormInput
          name="email"
          label=""
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          onFocus={handleFocus('email')}
          onBlur={handleBlur}
          error={Boolean(errors.email)}
          helperText={errors.email}
          inputProps={{ 'aria-label': 'Email' }}
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

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: '8px',
          mt: 2
        }}
      >
        {isSubmitting ? 'Please wait…' : 'Next'}
      </PrimaryButton>
    </Box>
  );
};

export default SignUpForm;

