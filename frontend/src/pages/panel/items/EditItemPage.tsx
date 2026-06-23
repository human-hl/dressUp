import { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Select, MenuItem,
    FormControl, InputLabel
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchItems, updateItem } from '../../../redux/slices/itemsSlice';
import type { RootState } from '../../../redux/store';
import type { IItem } from '../../../redux/types/dashboard';
import { useParams, useNavigate } from 'react-router-dom';

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
    sectionTitle: {
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#5C4E40',
        mb: '16px',
    },
    // Две колонки
    mainRow: {
        display: 'flex',
        gap: '32px',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
    },
    // Левая колонка (фото)
    leftCol: {
        flex: '1 1 45%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    // Правая колонка (форма)
    rightCol: {
        flex: '1 1 55%',
        display: 'flex',
        flexDirection: 'column',
    },
    field: {
        mb: '14px',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
                borderColor: '#BCAAA4',
            },
            '&:hover fieldset': {
                borderColor: '#487886',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#487886',
            },
        },
    },
    select: {
        borderRadius: '10px',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#BCAAA4',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#487886',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#487886',
        },
    },
    removeBgBtn: {
        backgroundColor: '#FED8F7',
        color: '#7E4886',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.85rem',
        borderRadius: '20px',
        px: '14px',
        py: '6px',
        width: 'fit-content',
        '&:hover': { backgroundColor: '#f5c8f0' },
    },
    submitBtn: {
        backgroundColor: '#487886',
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        borderRadius: '20px',
        px: '20px',
        py: '10px',
        width: '100%',
        mt: '8px',
        '&:hover': { backgroundColor: '#3b646f' },
    },
    imageUpload: {
        border: '2px dashed #487886',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: '#FAFAFA',
        minHeight: { xs: '280px', md: '420px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '16px',
        flex: 1,
        '&:hover': { backgroundColor: '#F0F0F0' },
    },
};

const EditItemPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items } = useAppSelector((state: RootState) => state.items);
    const item = items.find(i => i.id === Number(id));

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [color, setColor] = useState('');
    const [weather, setWeather] = useState('');
    const [material, setMaterial] = useState('');
    const [style, setStyle] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (items.length === 0) dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setCost(item.cost || '');
            setColor(item.color || '');
            setWeather(item.weather || '');
            setMaterial(item.material || '');
            setStyle(item.style || '');
            setCategory(item.category || '');
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(updateItem({
                id: Number(id),
                data: { name, cost, color, weather, material, style, category }
            })).unwrap();
            navigate(`/panel/items/${id}`);
        } catch (err: any) {
            alert(err || 'Ошибка при сохранении');
        }
    };

    if (!item) return <Typography>Загрузка...</Typography>;

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>Редактирование</Typography>
                    </Box>
                    <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth label="Название" sx={styles.field} value={name} onChange={(e) => setName(e.target.value)} />
                            <TextField fullWidth label="Цена" sx={styles.field} value={cost} onChange={(e) => setCost(e.target.value)} />
                            <TextField fullWidth label="Цвет" sx={styles.field} value={color} onChange={(e) => setColor(e.target.value)} />
                            <FormControl fullWidth sx={styles.field}>
                                <InputLabel>Погода</InputLabel>
                                <Select value={weather} label="Погода" onChange={(e) => setWeather(e.target.value)}>
                                    {['Лето','Зима','Демисезон','Дождь','Любая'].map(w => <MenuItem key={w} value={w}>{w}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={styles.field}>
                                <InputLabel>Материал</InputLabel>
                                <Select value={material} label="Материал" onChange={(e) => setMaterial(e.target.value)}>
                                    {['Хлопок','Шерсть','Кожа','Деним','Шёлк','Синтетика','Другое'].map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={styles.field}>
                                <InputLabel>Стиль</InputLabel>
                                <Select value={style} label="Стиль" onChange={(e) => setStyle(e.target.value)}>
                                    {['Повседневный','Спортивный','Деловой','Вечерний','Романтичный','Уличный'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={styles.field}>
                                <InputLabel>Категория</InputLabel>
                                <Select value={category} label="Категория" onChange={(e) => setCategory(e.target.value)}>
                                    {['Верх','Низ','Обувь','Аксессуары'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button type="submit" sx={styles.submitBtn} variant="contained" fullWidth startIcon={<SaveIcon />}>
                                Сохранить
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EditItemPage;