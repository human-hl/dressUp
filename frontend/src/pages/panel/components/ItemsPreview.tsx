import { Box, Typography, Card, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { IItem } from '../../../redux/types/dashboard';
import { useState } from 'react';

interface ItemsPreviewProps {
    items: IItem[];
}

const categories = ['Все', 'Верх', 'Низ', 'Обувь', 'Аксессуары'];

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
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
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
        height: '180px',
        borderRadius: '12px',
        border: '2px solid #487886',
        boxShadow: 'none',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.9,
        },
    },
    imageBox: {
        width: '100%',
        height: '130px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    itemName: {
        fontWeight: 600,
        color: '#3E2723',
        fontSize: '0.85rem',
        textAlign: 'center',
        p: '8px',
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

const ItemsPreview: React.FC<ItemsPreviewProps> = ({ items }) => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Все');

    const filteredItems = activeCategory === 'Все'
        ? items
        : items.filter(item => item.category === activeCategory);

    return (
        <Box sx={styles.section}>
            <Box sx={styles.titleRow}>
                <Typography sx={styles.title}>Предметы</Typography>
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
                {filteredItems.length === 0 ? (
                    <Card
                        sx={{
                            gridColumn: '1 / -1',
                            height: '180px',
                            width:'30%',
                            borderRadius: '12px',
                            border: '2px dashed #487886',
                            boxShadow: 'none',
                            backgroundColor: '#FAFAFA',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#F0F0F0',
                            },
                        }}
                        onClick={() => navigate('/panel/items/add')}
                    >
                        <Typography sx={{ fontSize: '2rem' }}>👕</Typography>
                        <Typography
                            sx={{
                                color: '#8D6E63',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                        >
                            Здесь пока пусто
                        </Typography>
                        <Typography
                            sx={{
                                color: '#BCAAA4',
                                fontSize: '0.8rem',
                            }}
                        >
                            Добавьте свой первый предмет
                        </Typography>
                    </Card>
                ) : (
                    filteredItems.slice(0, 4).map((item) => {
                        const img = item.image_no_bg_url || item.image_url;
                        return (
                            <Card
                                key={item.id}
                                sx={styles.card}
                                onClick={() => navigate(`/panel/items/${item.id}`)}
                            >
                                <Box sx={styles.imageBox}>
                                    {img ? (
                                        <img
                                            src={`http://localhost:3000${img}`}
                                            alt={item.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    ) : (
                                        <Typography sx={{ fontSize: '2rem' }}>👕</Typography>
                                    )}
                                </Box>
                                <Typography sx={styles.itemName}>{item.name}</Typography>
                            </Card>
                        );
                    })
                )}
            </Box>

            <Box sx={styles.viewAllRow}>
                <Button sx={styles.viewAllBtn} onClick={() => navigate('/panel/items')}>
                    Просмотреть все
                </Button>
            </Box>
        </Box>
    );
};

export default ItemsPreview;