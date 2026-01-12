import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';

interface AccountValidationFormProps {
  onSubmit: (values: { accountNumber: string; billingZipCode: string }) => Promise<void>;
  onToggleToLogin: () => void;
  isSubmitting: boolean;
}

interface FieldErrors {
  accountNumber?: string;
  billingZipCode?: string;
}

const AccountValidationForm: React.FC<AccountValidationFormProps> = ({
  onSubmit,
  onToggleToLogin,
  isSubmitting
}) => {
  const [values, setValues] = useState({
    accountNumber: '',
    billingZipCode: ''
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!values.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    }

    if (!values.billingZipCode.trim()) {
      newErrors.billingZipCode = 'Billing Zip Code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(values.billingZipCode.trim())) {
      newErrors.billingZipCode = 'Enter a valid zip code';
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
        Sign up
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('accountNumber') ? 8 : '24%',
            transform: isLabelFloating('accountNumber') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Account Number
        </Typography>
        <FormInput
          name="accountNumber"
          label=""
          type="text"
          autoComplete="off"
          value={values.accountNumber}
          onChange={handleChange('accountNumber')}
          onFocus={handleFocus('accountNumber')}
          onBlur={handleBlur}
          error={Boolean(errors.accountNumber)}
          helperText={errors.accountNumber}
          inputProps={{ 'aria-label': 'Account Number' }}
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
            top: isLabelFloating('billingZipCode') ? 8 : '24%',
            transform: isLabelFloating('billingZipCode') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Billing Zip Code
        </Typography>
        <FormInput
          name="billingZipCode"
          label=""
          type="text"
          autoComplete="postal-code"
          value={values.billingZipCode}
          onChange={handleChange('billingZipCode')}
          onFocus={handleFocus('billingZipCode')}
          onBlur={handleBlur}
          error={Boolean(errors.billingZipCode)}
          helperText={errors.billingZipCode}
          inputProps={{ 'aria-label': 'Billing Zip Code', maxLength: 10 }}
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
          mt: 2,
          mb: 2
        }}
      >
        {isSubmitting ? 'Validating…' : 'Validate'}
      </PrimaryButton>

      <Box
        sx={{
          textAlign: 'center',
          fontSize: 13
        }}
      >
        <span>Already have an account? </span>
        <Link
          component="button"
          type="button"
          underline="hover"
          sx={{ fontWeight: 600, fontSize: 13 }}
          onClick={onToggleToLogin}
        >
          Log in
        </Link>
      </Box>
    </Box>
  );
};

export default AccountValidationForm;

