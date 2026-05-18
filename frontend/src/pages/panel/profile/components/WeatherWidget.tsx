import { Box, Typography } from '@mui/material';

const WeatherWidget: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#D8F8FE',
        borderRadius: '12px',
        p: '16px 20px',
        minWidth: '160px',
        textAlign: 'center',
        border: '1px solid #487886',
      }}
    >
      <Typography sx={{ fontSize: '0.8rem', color: '#487886', mb: '4px', fontWeight: 500 }}>
        Сегодня
      </Typography>
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#487886' }}>
        09.02
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', color: '#487886', mt: '2px' }}>
        от -3 до +5
      </Typography>
      <Typography sx={{ fontSize: '0.8rem', color: '#487886', opacity: 0.8 }}>
        влажность 75%
      </Typography>
    </Box>
  );
};

export default WeatherWidget;