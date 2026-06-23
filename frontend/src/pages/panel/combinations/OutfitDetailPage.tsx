import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Card, CardContent, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchOutfits, deleteOutfit } from '../../../redux/slices/outfitsSlice';
import { API_URL } from '../../../api/axios';
import type { RootState } from '../../../redux/store';
import type { IOutfit } from '../../../redux/types/dashboard';

const styles = {
    layout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#DACCBE',
    },
    content: {
        flex: 1,
        p: { xs: '16px', sm: '24px', md: '32px' },
       overflow: 'auto',
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
    minHeight: { xs: '300px', md: '500px' },
    border: '2px solid #487886',
    borderRadius: '12px',
    backgroundColor: '#FAFAFA',
    position: 'relative',
    overflow: 'auto',
    width: '100%',
},
    rightCol: {
        flex: '1 1 55%',
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
    itemsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
        mb: '20px',
    },
    itemCard: {
        border: '2px solid #487886',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F5F0EB',
        },
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
        '&:hover': {
            backgroundColor: '#3b646f',
        },
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
        '&:hover': {
            backgroundColor: '#f5c8f0',
        },
    },
};

const OutfitDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { outfits, loading } = useAppSelector((state: RootState) => state.outfits);
    const [outfit, setOutfit] = useState<IOutfit | null>(null);
    const canvasHeight = outfit?.items?.reduce((max, oi) => {
    const right = (oi.position_x || 0) + (oi.width || 100);
    const bottom = (oi.position_y || 0) + (oi.height || 100);
    return Math.max(max, right + 50, bottom + 50);
}, 300) || 300;

    useEffect(() => {
        if (outfits.length === 0) {
            dispatch(fetchOutfits());
        }
    }, [dispatch]);

    useEffect(() => {
        const found = outfits.find(o => o.id === Number(id));
        setOutfit(found || null);
    }, [outfits, id]);

    const handleDelete = async () => {
        if (window.confirm('Удалить комбинацию?')) {
            try {
                await dispatch(deleteOutfit(Number(id))).unwrap();
                navigate('/panel/combinations');
            } catch {
                alert('Ошибка удаления');
            }
        }
    };
    

    if (loading || !outfit) {
        return (
            <Box sx={styles.layout}>
                <Sidebar />
                <Box sx={styles.content}>
                    <Box sx={styles.whiteBox}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                            <CircularProgress />
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>Комбинация</Typography>
                    </Box>

                    <Box sx={styles.mainRow}>
                        <Box sx={{ ...styles.leftCol, minHeight: `${canvasHeight}px`, width: `${canvasHeight * 1.5}px` }}>
                            {outfit.items?.map((oi) => {
                                const img = oi.item?.image_no_bg_url || oi.item?.image_url;
                                return (
                                    <Box
                                        key={oi.id}
                                        sx={{
                                            position: 'absolute',
                                            left: oi.position_x,
                                            top: oi.position_y,
                                            width: oi.width,
                                            height: oi.height,
                                            zIndex: oi.z_index,
                                        }}
                                    >
                                        {img ? (
                                            <img
                                                src={`${API_URL}${img}`}
                                                alt={oi.item?.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontSize: '2rem', textAlign: 'center' }}>👕</Typography>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box sx={styles.rightCol}>
                            <Typography sx={styles.sectionTitle}>Информация:</Typography>
                            <Box sx={styles.fieldsGrid}>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Название</Typography>
                                    <Typography sx={styles.fieldValue}>{outfit.name || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Погода</Typography>
                                    <Typography sx={styles.fieldValue}>{outfit.weather || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Стиль</Typography>
                                    <Typography sx={styles.fieldValue}>{outfit.style || '-'}</Typography>
                                </Box>
                                <Box sx={styles.fieldBox}>
                                    <Typography sx={styles.fieldLabel}>Категория</Typography>
                                    <Typography sx={styles.fieldValue}>{outfit.category || '-'}</Typography>
                                </Box>
                            </Box>

                            {outfit.items && outfit.items.length > 0 && (
                                <>
                                    <Typography sx={styles.sectionTitle}>Предметы:</Typography>
                                    <Box sx={styles.itemsGrid}>
                                        {outfit.items.map((oi) => (
                                            <Card
                                                key={oi.id}
                                                sx={styles.itemCard}
                                                onClick={() => navigate(`/panel/items/${oi.item?.id}`)}
                                            >
                                                <CardContent sx={{ p: '8px !important' }}>
                                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                                                        {oi.item?.name}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                </>
                            )}

                            <Box sx={styles.actions}>
                                <Button sx={styles.editBtn} startIcon={<EditIcon />}>
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

export default OutfitDetailPage;