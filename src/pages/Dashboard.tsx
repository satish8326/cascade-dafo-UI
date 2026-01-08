import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import DashboardCard from '../components/DashboardCard';
import IconBadge from '../components/IconBadge';
import MainLayout from '../layouts/MainLayout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      key: 'order-now',
      highlighted: true,
      title: 'Order Now',
      description: 'Create a new DAFO order',
      icon: (
        <IconBadge
          sx={{
            backgroundColor: '#E4E6EF',
            color: '#2D5499',
          }}
        >
          <ShoppingBagOutlinedIcon />
        </IconBadge>
      ),
      footerIcon: <ShoppingBagOutlinedIcon />,
      onClick: () => navigate('/new-order'),
    },
    {
      key: 'orders',
      title: 'Orders',
      description: 'See real-time status of your orders',
      icon: (
        <IconBadge
          sx={{
            backgroundColor: '#E4E6EF',
            color: '#2D5499',
          }}
        >
          <ListAltOutlinedIcon />
        </IconBadge>
      ),
      footerIcon: <ListAltOutlinedIcon />,
      onClick: () => navigate('/orders'),
    },
    {
      key: 'resume-draft',
      title: 'Resume Draft',
      description: 'Continue a saved order',
      icon: (
        <IconBadge
          sx={{
            backgroundColor: '#E4E6EF',
            color: '#2D5499',
          }}
        >
          <DescriptionOutlinedIcon />
        </IconBadge>
      ),
      footerIcon: <DescriptionOutlinedIcon />,
      onClick: () => navigate('/orders', { state: { filter: 'Draft' } }),
    },
    {
      key: 'manage-templates',
      title: 'Manage Templates',
      description: 'Preload customizations to speed up orders',
      icon: (
        <IconBadge
          sx={{
            backgroundColor: '#E4E6EF',
            color: '#2D5499',
          }}
        >
          <ViewQuiltOutlinedIcon />
        </IconBadge>
      ),
      footerIcon: <ViewQuiltOutlinedIcon />,
      onClick: () => navigate('/templates'),
    },
  ];

  return (
    <MainLayout>
      <Box
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: 'flex',
          alignItems: 'center',   
          justifyContent: 'center', 
          minHeight: 'calc(100vh - 200px)',
          width: '100%',
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          sx={{
            width: {
              xs: '100%',
              sm: 480,
              md: 560,
              lg: 640,
            },
          }}
        >
          {cards.map((card) => (
            <Grid key={card.key} item xs={12} md={6} className="w-full" sx={{ display: 'flex' }}>
              <DashboardCard
                highlighted={card.highlighted}
                title={card.title}
                description={card.description}
                footerIcon={'footerIcon' in card ? card.footerIcon : undefined}
                sx={{
                  color: '#000',
                  '&:hover': {
                    backgroundColor: card.highlighted ? '#2d5499 !important' : '#ffffff !important',
                  },
                }}
                icon={card.icon}
                onClick={card.onClick}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;


