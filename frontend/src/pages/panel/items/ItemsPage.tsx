import { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../components/Sidebar';
import ItemCard from '../items/components/ItemCard';
import EmptyItems from '../items/components/EmptyItems';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchItems } from '../../../redux/slices/itemsSlice';
import type { IItem } from '../../../redux/types/dashboard';
import type { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

const categories = ['Все', 'Верх', 'Низ', 'Обувь', 'Аксессуары'];

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
        mb: '16px',
        flexWrap: 'wrap',
        gap: '12px',
    },
    title: {
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
        fontWeight: 700,
        color: '#5C4E40',
    },
    addBtn: {
    backgroundColor: '#487886',
    color: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.9rem',
    borderRadius: '20px',
    px: '20px',
    py: '8px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '&:hover': { backgroundColor: '#3b646f' },
},
catline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    mb: '20px',
    flexWrap: 'wrap',
},
    categories: {
        display: 'flex',
        gap: '8px',
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px',
    },
    loadingBox: {
        display: 'flex',
        justifyContent: 'center',
        mt: '80px',
    },
};

const ItemsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [activeCategory, setActiveCategory] = useState('Все');
    const { items, loading } = useAppSelector((state: RootState) => state.items);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const filteredItems =
        activeCategory === 'Все'
            ? items
            : items.filter((item: IItem) => item.category === activeCategory)

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>Предметы</Typography>
                    </Box>

                    <Box sx={styles.catline}>
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
                         <Button sx={styles.addBtn} endIcon={<AddIcon />} onClick={() => navigate('/panel/items/add')}>
                            Добавить
                        </Button>
                    </Box>

                    { loading ? (
                        <Box sx={styles.loadingBox}>
                            <CircularProgress />
                        </Box>
                    ) : filteredItems.length === 0 ? (
                        <EmptyItems/>
                    ) : (
                        <Box sx={styles.grid}>
                            {filteredItems.map((item: IItem) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </Box>
                    )}

                </Box>
            </Box>
        </Box>
    );
};

export default ItemsPage;