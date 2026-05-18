import { useState } from 'react';
import {
    Box, Typography, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../components/Sidebar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createItem } from '../../../redux/slices/itemsSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks/redux';
import api from '../../../api/axios';

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

const categories = ['Верх', 'Низ', 'Обувь', 'Аксессуары'];
const materials = ['Хлопок', 'Шерсть', 'Кожа', 'Деним', 'Шёлк', 'Синтетика', 'Другое'];
const styles_list = ['Повседневный', 'Спортивный', 'Деловой', 'Вечерний', 'Романтичный', 'Уличный'];
const weathers = ['Лето', 'Зима', 'Демисезон', 'Дождь', 'Любая'];

const AddItemPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [color, setColor] = useState('');
    const [weather, setWeather] = useState('');
    const [material, setMaterial] = useState('');
    const [style, setStyle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [imageNoBg, setImageNoBg] = useState<string | null>(null);
   

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveBg = async () => {
    if (!image) {
        alert('Сначала загрузите фото');
        return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
        const res = await api.post('/items/remove-bg', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        setImageNoBg(res.data.url);
        setPreview(`http://localhost:3000${res.data.url}`);
        alert('Фон удалён!');
    } catch (err: any) {
        alert(err.response?.data?.message || 'Ошибка удаления фона');
    }
};

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        alert('Введите название предмета');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('color', color);
    formData.append('material', material);
    formData.append('style', style);
    formData.append('weather', weather);
    formData.append('cost', cost);
    
    if (imageNoBg) {
        // Если фон удалён — отправляем путь к фото без фона
        formData.append('image_no_bg_url', imageNoBg);
        // И оригинал тоже
        if (image) {
            formData.append('image', image);
        }
    } else if (image) {
        formData.append('image', image);
    }

    try {
        await api.post('/items', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Предмет создан!');
        navigate('/panel/items');
    } catch (err: any) {
        alert(err.response?.data?.message || 'Ошибка при создании');
    }
};

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>Предмет</Typography>
                    </Box>

                    <Box sx={styles.mainRow}>
                        {/* Левая колонка — фото + удалить фон */}
                        <Box sx={styles.leftCol}>
                            <Box
                                sx={styles.imageUpload}
                                onClick={() => document.getElementById('item-image')?.click()}
                            >
                                {preview ? (
                                    <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img
                                            src={preview}
                                            alt="preview"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '400px',
                                                borderRadius: '8px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#fff' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImage(null);
                                                setPreview(null);
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <AddPhotoAlternateIcon sx={{ fontSize: '3.5rem', color: '#487886', mb: '8px' }} />
                                        <Typography sx={{ color: '#8D6E63' }}>
                                            Нажмите, чтобы загрузить фото
                                        </Typography>
                                    </Box>
                                )}
                                <input type="file" id="item-image" hidden accept="image/*" onChange={handleImageChange} />
                            </Box>

                            {image && (
                                <Button sx={styles.removeBgBtn} onClick={handleRemoveBg}>
                                    Удалить фон
                                </Button>
                            )}
                        </Box>

                        {/* Правая колонка — форма */}
                        <Box sx={styles.rightCol}>
                            <Typography sx={styles.sectionTitle}>Информация:</Typography>

                            <form onSubmit={handleSubmit}>
                                <TextField fullWidth label="Название" variant="outlined" sx={{ ...styles.field, ...styles.input }} value={name} onChange={(e) => setName(e.target.value)} />
                                <TextField fullWidth label="Цена" variant="outlined" sx={{ ...styles.field, ...styles.input }} value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Ввести..." />

                                <FormControl fullWidth sx={styles.field}>
                                    <InputLabel>Погода</InputLabel>
                                    <Select value={weather} label="Погода" sx={styles.select} onChange={(e) => setWeather(e.target.value)}>
                                        {weathers.map((w) => (<MenuItem key={w} value={w}>{w}</MenuItem>))}
                                    </Select>
                                </FormControl>

                                <TextField fullWidth label="Цвет" variant="outlined" sx={{ ...styles.field, ...styles.input }} value={color} onChange={(e) => setColor(e.target.value)} placeholder="Ввести..." />

                                <FormControl fullWidth sx={styles.field}>
                                    <InputLabel>Материал</InputLabel>
                                    <Select value={material} label="Материал" sx={styles.select} onChange={(e) => setMaterial(e.target.value)}>
                                        {materials.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={styles.field}>
                                    <InputLabel>Стиль</InputLabel>
                                    <Select value={style} label="Стиль" sx={styles.select} onChange={(e) => setStyle(e.target.value)}>
                                        {styles_list.map((s) => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={styles.field}>
                                    <InputLabel>Категория</InputLabel>
                                    <Select value={category} label="Категория" sx={styles.select} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
                                    </Select>
                                </FormControl>

                                <Button type="submit" sx={styles.submitBtn} startIcon={<AddIcon />}>
                                    Добавить
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddItemPage;