import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../sections/LoginForm';
import cascadeDafoLogo from '../assets/cascade-dafo-logo.png';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <Box
        sx={{
          textAlign: 'center',
          mb: 1
        }}
      >
        <Typography
          variant="h4"
          sx={{
            lineHeight: 0,
            m: 0,
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={cascadeDafoLogo}
            alt="Cascade"
            style={{ height: 62, display: 'block' }} // adjust as needed
          />
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
         
            fontWeight: 600,
            fontSize: 18
          }}
        >
          DAFO Now
        </Typography>
      </Box>

      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
