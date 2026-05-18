import { Box, Typography, Card, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { IOutfit } from '../../../redux/types/dashboard';
import { useState } from 'react';

interface OutfitsPreviewProps {
    outfits: IOutfit[];
}

const categories = ['Все', 'Повседневные', 'Спорт', 'Деловые', 'Вечерние', 'Сезонные'];

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
    categories: {
        display: 'flex',
        gap: '8px',
        mb: '16px',
        flexWrap: 'wrap',
    },
    chip: (active: boolean) => ({
        borderRadius: '20px',
        border: active ? 'none' : '1px solid #BCAAA4',
        backgroundColor: active ? '#487886' : 'transparent',
        color: active ? '#FFFFFF' : '#8D6E63',
        fontWeight: 500,
        fontSize: '0.85rem',
        px: '16px',
        py: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
            backgroundColor: active ? '#3b646f' : '#F5F0EB',
        },
    }),
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '12px',
        mb: '16px',
    },
    card: {
        height: '160px',
        borderRadius: '12px',
        border: '2px solid #487886',
        boxShadow: 'none',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3px',
        p: '6px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F5F0EB',
        },
    },
    miniBox: {
        backgroundColor: '#FAFAFA',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    viewAllRow: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    viewAllBtn: {
        backgroundColor: '#487886',
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.85rem',
        borderRadius: '20px',
        px: '20px',
        py: '8px',
        '&:hover': {
            backgroundColor: '#3b646f',
        },
    },
};

const OutfitsPreview: React.FC<OutfitsPreviewProps> = ({ outfits }) => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Все');

    const filteredOutfits = activeCategory === 'Все'
        ? outfits
        : outfits.filter(o => o.category === activeCategory);

    return (
        <Box sx={styles.section}>
            <Box sx={styles.titleRow}>
                <Typography sx={styles.title}>Комбинации</Typography>
                <Box sx={styles.arrowBox}>
                    <ArrowForwardIcon sx={{ color: '#fff', fontSize: '1rem' }} />
                </Box>
            </Box>

            <Box sx={styles.categories}>
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        sx={styles.chip(activeCategory === cat)}
                        onClick={() => setActiveCategory(cat)}
                    />
                ))}
            </Box>

            <Box sx={styles.grid}>
                {filteredOutfits.slice(0, 5).map((outfit) => {
                    const previewItems = outfit.items?.slice(0, 4) || [];
                    return (
                        <Card
                            key={outfit.id}
                            sx={styles.card}
                            onClick={() => navigate(`/panel/combinations/${outfit.id}`)}
                        >
                            {previewItems.length > 0 ? (
                                previewItems.map((oi: any, i: number) => {
                                    const img = oi.item?.image_no_bg_url || oi.item?.image_url;
                                    return (
                                        <Box key={i} sx={styles.miniBox}>
                                            {img ? (
                                                <img
                                                    src={`http://localhost:3000${img}`}
                                                    alt=""
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            ) : (
                                                <Typography sx={{ fontSize: '1rem' }}>👕</Typography>
                                            )}
                                        </Box>
                                    );
                                })
                            ) : (
                                <Typography
                                    sx={{
                                        gridColumn: '1/-1',
                                        textAlign: 'center',
                                        color: '#BCAAA4',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    Пусто
                                </Typography>
                            )}
                        </Card>
                    );
                })}
            </Box>

            <Box sx={styles.viewAllRow}>
                <Button sx={styles.viewAllBtn} onClick={() => navigate('/panel/combinations')}>
                    Просмотреть все
                </Button>
            </Box>
        </Box>
    );
};

export default OutfitsPreview;