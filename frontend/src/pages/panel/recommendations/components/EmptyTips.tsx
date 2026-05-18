import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const EmptyTips: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '80px',
        textAlign: 'center',
      }}
    >
      <SentimentDissatisfiedIcon
        sx={{ fontSize: 120, color: '#BCAAA4', mb: '16px' }}
      />
      <Typography
        sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#5C4E40' }}
      >
        Здесь пока пусто
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', color: '#8D6E63' }}>
        Советы скоро появятся
      </Typography>
    </Box>
  );
};

export default EmptyTips;