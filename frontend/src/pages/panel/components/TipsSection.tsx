import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { ITip } from '../../../redux/types/dashboard';

interface TipsSectionProps {
    tips: ITip[];
}

const shuffleArray = (array: ITip[]): ITip[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const styles = {
    section: {
        mb: { xs: '24px', md: '32px' },
    },
    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        mb: '16px',
    },
    title: {
        fontSize: { xs: '1.1rem', sm: '1.5rem' },
        fontWeight: 700,
        color: '#5C4E40',
    },
    arrowBox: {
        width: 28,
        height: 28,
        borderRadius: '6px',
        backgroundColor: '#5C4E40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    cardsRow: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: '12px',
        mb: '12px',
    },
    card: {
        borderRadius: '12px',
        boxShadow: 'none',
        backgroundColor: '#D8F8FE',
        border: 'none',
        p: '30px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '56px',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.85,
        },
    },
    tipTitle: {
        fontWeight: 600,
        fontSize: { xs: '0.85rem', sm: '0.95rem' },
        color: '#487886',
    },
    dots: {
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
    },
    dot: (active: boolean) => ({
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: active ? '#487886' : '#D7CCC8',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
    }),
};

const TipsSection: React.FC<TipsSectionProps> = ({ tips }) => {
    const [page, setPage] = useState(0);
    const perPage = 3;
    const totalPages = 3;
    const navigate = useNavigate();

    // Выбираем 9 случайных советов из всех
    const randomTips = useMemo(() => {
        const shuffled = shuffleArray(tips);
        return shuffled.slice(0, 9);
    }, [tips]);

    // Авто-перелистывание каждые 5 секунд
    useEffect(() => {
        const interval = setInterval(() => {
            setPage((prev) => (prev + 1) % totalPages);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (!randomTips || randomTips.length === 0) return null;

    const visibleTips = randomTips.slice(page * perPage, page * perPage + perPage);

    return (
        <Box sx={styles.section}>
            <Box sx={styles.titleRow}>
                <Typography sx={styles.title}>Советы для вас</Typography>
                <Box sx={styles.arrowBox}>
                    <ArrowForwardIcon sx={{ color: '#fff', fontSize: '1rem' }} />
                </Box>
            </Box>

            <Box sx={styles.cardsRow}>
                {visibleTips.map((tip) => (
                    <Card
                        key={tip.id}
                        sx={styles.card}
                        onClick={() => navigate(`/panel/recommendations/${tip.id}`)}
                    >
                        <CardContent sx={{ p: '0 !important' }}>
                            <Typography sx={styles.tipTitle}>{tip.title}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box sx={styles.dots}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Box
                        key={index}
                        sx={styles.dot(page === index)}
                        onClick={() => setPage(index)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TipsSection;