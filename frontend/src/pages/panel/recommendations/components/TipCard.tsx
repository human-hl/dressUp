import { Card, CardContent, Typography } from '@mui/material';
import type { ITip } from '../../../../redux/types/dashboard';
import { useNavigate } from 'react-router-dom';

interface TipCardProps {
  tip: ITip;
  variant: 'wide' | 'small';
}

const getColors = (type: 'tip' | 'ad') => {
  if (type === 'ad') {
    return {
      bg: '#FED8F7',
      title: '#7E4886',
      desc: '#7E4886',
    };
  }
  return {
    bg: '#D8F8FE',
    title: '#487886',
    desc: '#487886',
  };
};

const TipCard: React.FC<TipCardProps> = ({ tip, variant }) => {
  const c = getColors(tip.type);
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/panel/recommendations/${tip.id}`)}
      sx={{
        borderRadius: '12px',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: c.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: '20px',
        height: '100%',
        cursor: 'pointer', 
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      <CardContent sx={{ p: '0 !important' }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: variant === 'wide' ? '1.25rem' : '1rem',
            color: c.title,
            mb: '8px',
          }}
        >
          {tip.title}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '0.9rem',
            color: c.desc,
            opacity: 0.8,
          }}
        >
          {tip.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TipCard;