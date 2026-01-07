import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  name: string;
  label: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, label, ...rest }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      name={name}
      label={label}
      {...rest}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 999,
          backgroundColor: '#ffffff'
        },
        ...rest.sx
      }}
    />
  );
};

export default FormInput;
