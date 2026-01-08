import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TopNavBar from '../components/TopNavBar';
import '@fontsource/poppins'; // default weight 400
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
export interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  hideFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, fullWidth = false, hideFooter = false }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#ffffff',
          pt: { xs: 8, sm: 9 }
        }}
      >
        {fullWidth ? (
          children
        ) : (
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, sm: 2 }
            }}
          >
            {children}
          </Container>
        )}
      </Box>
      {/* Footer can be conditionally rendered here in the future when footer component is added */}
      {!hideFooter && false && <Box component="footer">{/* Footer component will go here */}</Box>}
    </Box>
  );
};

export default MainLayout;


