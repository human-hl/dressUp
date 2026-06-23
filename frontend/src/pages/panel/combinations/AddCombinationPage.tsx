import { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../components/Sidebar';
import DraggableItem from './components/DraggableItem';
import Canvas from './components/Canvas';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchItems } from '../../../redux/slices/itemsSlice';
import type { RootState } from '../../../redux/store';
import type { IItem } from '../../../redux/types/dashboard';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { createOutfit } from '../../../redux/slices/outfitsSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api/axios';

export interface CanvasItem extends IItem {
    dndId: string;
    position_x: number;
    position_y: number;
    width: number;
    height: number;
    z_index: number;
}

const categories = ['Все', 'Верх', 'Низ', 'Обувь', 'Аксессуары'];
const weathers = ['Лето', 'Зима', 'Демисезон', 'Дождь', 'Любая'];
const styles_list = ['Повседневный', 'Спортивный', 'Деловой', 'Вечерний', 'Романтичный', 'Уличный'];
const outfitCategories = ['Повседневные', 'Спорт', 'Деловые', 'Вечерние', 'Сезонные'];

const styles = {
    layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#DACCBE' },
    content: { flex: 1, p: { xs: '16px', sm: '24px', md: '32px' }, overflowY: 'auto', pb: { xs: '100px', md: '32px' } },
    whiteBox: { backgroundColor: '#FFFFFF', borderRadius: '16px', p: { xs: '16px', sm: '24px', md: '32px' }, boxShadow: '0px 2px 12px rgba(0,0,0,0.06)', minHeight: '100%' },
    header: { display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '24px' },
    title: { fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 700, color: '#5C4E40' },
    mainRow: { display: 'flex', gap: '24px', flexWrap: { xs: 'wrap', md: 'nowrap' }, mb: '24px' },
    rightPanel: { flex: '1 1 50%', minWidth: '250px' },
    sectionTitle: { fontSize: '0.95rem', fontWeight: 600, color: '#5C4E40', mb: '12px' },
    categories: { display: 'flex', gap: '6px', mb: '12px', flexWrap: 'wrap' },
    chip: (active: boolean) => ({
        borderRadius: '20px', border: active ? 'none' : '1px solid #BCAAA4',
        backgroundColor: active ? '#487886' : 'transparent', color: active ? '#FFFFFF' : '#8D6E63',
        fontWeight: 500, fontSize: '0.75rem', px: '12px', py: '4px', cursor: 'pointer',
        '&:hover': { backgroundColor: active ? '#3b646f' : '#F5F0EB' },
    }),
    itemsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px', maxHeight: '400px', overflowY: 'auto' },
    infoSection: { mb: '20px' },
    fieldsRow: { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: '12px', mb: '16px' },
    input: { '& .MuiOutlinedInput-root': { borderRadius: '10px', '& fieldset': { borderColor: '#BCAAA4' }, '&:hover fieldset': { borderColor: '#487886' }, '&.Mui-focused fieldset': { borderColor: '#487886' } } },
    select: { borderRadius: '10px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#BCAAA4' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#487886' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#487886' } },
    submitBtn: { backgroundColor: '#487886', color: '#FFFFFF', textTransform: 'none', fontWeight: 600, fontSize: '0.9rem', borderRadius: '20px', px: '20px', py: '10px', width: 'fit-content', '&:hover': { backgroundColor: '#3b646f' } },
};

const AddCombinationPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items } = useAppSelector((state: RootState) => state.items);
    const [activeCategory, setActiveCategory] = useState('Все');
    const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
   const [name, setName] = useState('');
const [weather, setWeather] = useState('');
const [style, setStyle] = useState('');
const [category, setCategory] = useState('');

    useEffect(() => {
        if (items.length === 0) dispatch(fetchItems());
    }, [dispatch, items.length]);

    const filteredItems = activeCategory === 'Все' ? items : items.filter((i: IItem) => i.category === activeCategory);
    const isItemOnCanvas = (itemId: number) => canvasItems.some((ci) => ci.id === itemId);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over, delta } = event;

        if (over && over.id === 'canvas' && active.data.current?.from === 'panel') {
            const item = active.data.current.item as IItem;
            if (!isItemOnCanvas(item.id)) {
                const newItem: CanvasItem = {
                    ...item,
                    dndId: `canvas-${item.id}-${Date.now()}`,
                    position_x: Math.random() * 300 + 20,
                    position_y: Math.random() * 200 + 20,
                    width: 100,
                    height: 100,
                    z_index: canvasItems.length + 1,
                };
                setCanvasItems((prev) => [...prev, newItem]);
            }
        }

        if (active.data.current?.from === 'canvas') {
            setCanvasItems((prev) =>
                prev.map((ci) =>
                    ci.dndId === active.id
                        ? { ...ci, position_x: ci.position_x + delta.x, position_y: ci.position_y + delta.y }
                        : ci
                )
            );
        }
    };

    const removeFromCanvas = (dndId: string) => {
        setCanvasItems((prev) => prev.filter((ci) => ci.dndId !== dndId));
    };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canvasItems.length === 0) {
        alert('Добавьте хотя бы одну вещь');
        return;
    }

    try {
       await dispatch(createOutfit({
    name: name || `Комбинация ${new Date().toLocaleDateString()}`,
    category,
    style,
    weather,
    items: canvasItems.map(ci => ({
        itemId: ci.id,
        position_x: ci.position_x,
        position_y: ci.position_y,
        width: ci.width,
        height: ci.height,
        z_index: ci.z_index,
    })),
})).unwrap();
        navigate('/panel/combinations');
    } catch (err: any) {
        alert(err || 'Ошибка при создании');
    }
};

const handleResize = (dndId: string, width: number, height: number) => {
    setCanvasItems(prev =>
        prev.map(ci => ci.dndId === dndId ? { ...ci, width, height } : ci)
    );
};

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    <Box sx={styles.header}>
                        <Typography sx={styles.title}>Комбинация</Typography>
                    </Box>

                    <DndContext onDragEnd={handleDragEnd}>
                        <Box sx={styles.mainRow}>
                           <Canvas items={canvasItems} onRemove={removeFromCanvas} onResize={handleResize} />
                            <Box sx={styles.rightPanel}>
                                <Typography sx={styles.sectionTitle}>Выбранные вещи:</Typography>
                                <Box sx={styles.categories}>
                                    {categories.map((cat) => (
                                        <Chip key={cat} label={cat} sx={styles.chip(activeCategory === cat)} onClick={() => setActiveCategory(cat)} />
                                    ))}
                                </Box>
                                <Box sx={styles.itemsGrid}>
                                    {filteredItems.map((item) => (
                                        <DraggableItem key={item.id} item={item} isSelected={isItemOnCanvas(item.id)} />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </DndContext>

                    <Box sx={styles.infoSection}>
                        <Typography sx={styles.sectionTitle}>Информация:</Typography>
                        <form onSubmit={handleSubmit}>
                            <Box sx={styles.fieldsRow}>
                                <TextField fullWidth label="Название" variant="outlined" sx={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ввести..." />
                                <FormControl fullWidth><InputLabel>Погода</InputLabel><Select value={weather} label="Погода" sx={styles.select} onChange={(e) => setWeather(e.target.value)}>{weathers.map((w) => (<MenuItem key={w} value={w}>{w}</MenuItem>))}</Select></FormControl>
                                <FormControl fullWidth><InputLabel>Стиль</InputLabel><Select value={style} label="Стиль" sx={styles.select} onChange={(e) => setStyle(e.target.value)}>{styles_list.map((s) => (<MenuItem key={s} value={s}>{s}</MenuItem>))}</Select></FormControl>
                                <FormControl fullWidth><InputLabel>Категория</InputLabel><Select value={category} label="Категория" sx={styles.select} onChange={(e) => setCategory(e.target.value)}>{outfitCategories.map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}</Select></FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Button type="submit" sx={styles.submitBtn} startIcon={<AddIcon />}>Добавить</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddCombinationPage;