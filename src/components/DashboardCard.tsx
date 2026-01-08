import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

export interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
  footerIcon?: React.ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  highlighted = false,
  footerIcon,
  onClick,
  sx
}) => {
  return (
    <Card
      elevation={highlighted ? 5 : 2}
      sx={{
        borderRadius: 3,
        backgroundColor: highlighted ? '#2d5499 !important' : '#ffffff !important',
        color: highlighted ? '#ffffff !important' : 'inherit',
        boxShadow: highlighted
          ? '0 10px 24px rgba(45, 84, 153, 0.45)'
          : '0 4px 16px rgba(15, 23, 42, 0.08)',
        ...sx
      }}
    >
      <CardActionArea
        onClick={onClick}
        disableRipple
        sx={{
          p: 3,
          textAlign: 'left',
          alignItems: 'stretch',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 140,
          backgroundColor: 'transparent !important',
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent !important',
          },
          '&.MuiCardActionArea-focusVisible': {
            backgroundColor: 'transparent !important',
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'relative',
            zIndex: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                color: highlighted ? '#ffffff !important' : 'inherit'
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: highlighted ? '#ffffff !important' : 'inherit'
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
        {footerIcon && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -20,
              right: -20,
              opacity: 0.2,
              zIndex: 1,
              pointerEvents: 'none',
              '& svg': {
                fontSize: '120px',
                color: '#ffffff',
                padding: '0px 10px'
              }
            }}
          >
            {footerIcon}
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;


