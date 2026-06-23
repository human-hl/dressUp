import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Card, CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchItems, deleteItem } from '../../../redux/slices/itemsSlice';
import { API_URL } from '../../../api/axios';
import type { RootState } from '../../../redux/store';
import type { IItem } from '../../../redux/types/dashboard';

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
    mainRow: {
        display: 'flex',
        gap: '32px',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        mb: '24px',
    },
    leftCol: {
        flex: '1 1 45%',
        minWidth: 0,
    },
    photoBox: {
        border: '2px solid #487886',
        borderRadius: '12px',
        backgroundColor: '#FAFAFA',
        minHeight: { xs: '280px', md: '420px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '16px',
        height: '100%',
        width: '100%',
    },
    rightCol: {
        flex: '1 1 55%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
    },
    sectionTitle: {
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#5C4E40',
        mb: '16px',
    },
    fieldsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        mb: '16px',
    },
    fieldBox: {
        border: '1px solid #487886',
        borderRadius: '10px',
        p: '10px 14px',
        backgroundColor: '#FAFAFA',
    },
    fieldLabel: {
        fontSize: '0.75rem',
        color: '#8D6E63',
        mb: '2px',
    },
    fieldValue: {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#5C4E40',
        wordBreak: 'break-word',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    editBtn: {
        backgroundColor: '#487886',
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        borderRadius: '20px',
        px: '20px',
        py: '10px',
        flex: 1,
        minWidth: '140px',
        '&:hover': { backgroundColor: '#3b646f' },
    },
    deleteBtn: {
        backgroundColor: '#FED8F7',
        color: '#7E4886',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        borderRadius: '20px',
        px: '20px',
        py: '10px',
        flex: 1,
        minWidth: '140px',
        '&:hover': { backgroundColor: '#f5c8f0' },
    },
};

const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state: RootState) => state.items);
    const [item, setItem] = useState<IItem | null>(null);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchItems());
        }
    }, [dispatch, items.length]);

    useEffect(() => {
        const found = items.find((i) => i.id === Number(id));
        setItem(found || null);
    }, [items, id]);

    const handleDelete = async () => {
        if (window.confirm('Удалить предмет?')) {
            try {
                await dispatch(deleteItem(Number(id))).unwrap();
                navigate('/panel/items');
            } catch (err) {
                alert('Ошибка удаления');
            }
        }
    };

    if (!item) {
        return (
            <Box sx={styles.layout}>
                <Sidebar />
                <Box sx={styles.content}>
                    <Box sx={styles.whiteBox}>
                        <Typography sx={{ textAlign: 'center', mt: 10 }}>Загрузка...</Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    const imageUrl = item.image_no_bg_url || item.image_url;

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>{item.name}</Typography>
                    </Box>

                    <Box sx={styles.mainRow}>
                        <Box sx={styles.leftCol}>
                            <Box sx={styles.photoBox}>
                                {imageUrl ? (
                                    <img
                                        src={`${API_URL}${imageUrl}`}
                                        alt={item.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '400px',
                                            borderRadius: '8px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{ fontSize: '5rem', color: '#BCAAA4' }}>👕</Typography>
                                )}
                            </Box>
                        </Box>

                        <Box sx={styles.rightCol}>
                            <Typography sx={styles.sectionTitle}>Информация:</Typography>
                            <Box sx={styles.fieldsGrid}>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Цена</Typography>
                                    <Typography sx={styles.fieldValue}>{item.cost || '-'} ₽</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Погода</Typography>
                                    <Typography sx={styles.fieldValue}>{item.weather || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Материал</Typography>
                                    <Typography sx={styles.fieldValue}>{item.material || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Стиль</Typography>
                                    <Typography sx={styles.fieldValue}>{item.style || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Цвет</Typography>
                                    <Typography sx={styles.fieldValue}>{item.color || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Категория</Typography>
                                    <Typography sx={styles.fieldValue}>{item.category || '-'}</Typography>
                                </Box>
                            </Box>

                            <Box sx={styles.actions}>
                                <Button sx={styles.editBtn} startIcon={<EditIcon />} onClick={() => navigate(`/panel/items/${item.id}/edit`)}>
                                    Редактировать
                                </Button>
                                <Button sx={styles.deleteBtn} startIcon={<DeleteIcon />} onClick={handleDelete}>
                                    Удалить
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ItemDetailPage;