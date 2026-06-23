import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchTips } from '../../../redux/slices/tipsSlice';
import type { RootState } from '../../../redux/store';
import type { ITip } from '../../../redux/types/dashboard';

const getColors = (type: 'tip' | 'ad') => {
    if (type === 'ad') {
        return { bg: '#FED8F7', title: '#7E4886', text: '#7E4886' };
    }
    return { bg: '#D8F8FE', title: '#487886', text: '#487886' };
};

const styles = {
    layout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#DACCBE',
    },
    content: {
        flex: 1,
        p: { xs: '16px', sm: '24px', md: '32px' },
        overflowY: 'auto',
        pb: { xs: '100px', md: '32px' },
    },
    whiteBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        p: { xs: '16px', sm: '24px', md: '32px' },
        boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
        minHeight: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '24px',
    },
    title: {
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
        fontWeight: 700,
        color: '#5C4E40',
    },
    card: (bg: string) => ({
    backgroundColor: bg,
    borderRadius: '12px',
    px: '15px',
    py: '12px',
    display: 'inline-block',
    width: 'fit-content',
    maxWidth: '100%',
    textAlign: 'left',
    mb: '24px',
    wordBreak: 'break-word',
}),
tipTitle: (color: string) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: color,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
}),
    description: (color: string) => ({
        fontSize: '1rem',
        color: color,
        opacity: 0.8,
    }),
    // Новый стиль для полного текста
    contentText: {
        fontSize: '1rem',
        lineHeight: 1.8,
        color: '#3E2723',
        whiteSpace: 'pre-line',
    },
};

const TipDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { tips, loading } = useAppSelector((state: RootState) => state.tips);

    useEffect(() => {
        if (tips.length === 0) {
            dispatch(fetchTips());
        }
    }, [dispatch, tips.length]);

    const tip = tips.find((t: ITip) => t.id === Number(id));

    if (loading || !tip) {
        return (
            <Box sx={styles.layout}>
                <Sidebar />
                <Box sx={styles.content}>
                    <Box sx={styles.whiteBox}>
                        <Typography>Загрузка...</Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    const c = getColors(tip.type);

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>Совет</Typography>
                    </Box>

                    <Box sx={styles.card(c.bg)}>
                        <Typography sx={styles.tipTitle(c.title)}>{tip.title}</Typography>
                    </Box>

                    {/* Полный текст совета */}
                    {tip.content && (
                        <Typography sx={styles.contentText}>
                            {tip.content}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default TipDetailPage;