import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const styles = {
  emptyBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: '80px',
    textAlign: 'center',
  },
  icon: {
    fontSize: '120px',
    color: '#BCAAA4',
    mb: '16px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#5C4E40',
    mb: '8px',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#8D6E63',
  },
};

const EmptyItems: React.FC = () => {
  return (
    <Box sx={styles.emptyBox}>
      <SentimentDissatisfiedIcon sx={styles.icon} />
      <Typography sx={styles.title}>Здесь пока пусто</Typography>
      <Typography sx={styles.subtitle}>
        Добавьте свой первый предмет гардероба
      </Typography>
    </Box>
  );
};

export default EmptyItems;