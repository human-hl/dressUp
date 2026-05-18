import { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../components/Sidebar';
import OutfitCard from './components/OutfitCard';
import EmptyOutfits from './components/EmptyOutfits';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchOutfits } from '../../../redux/slices/outfitsSlice';
import type { IOutfit } from '../../../redux/types/dashboard';
import type { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';


const categories = ['Все', 'Повседневные', 'Спорт', 'Деловые', 'Вечерние', 'Сезонные'];

const s = {
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
    '&:hover': { backgroundColor: '#3b646f' },
  },
  catline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
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


const CombinationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState('Все');
  const { outfits, loading } = useAppSelector((state: RootState) => state.outfits);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOutfits());
  }, [dispatch]);

  const filteredOutfits =
    activeCategory === 'Все'
      ? outfits
      : outfits.filter((o: IOutfit) => o.category === activeCategory);

  return (
    <Box sx={s.layout}>
      <Sidebar />
      <Box sx={s.content}>
        <Box sx={s.whiteBox}>
          <Box sx={s.header}>
            <Typography sx={s.title}>Комбинации</Typography>
          </Box>

          <Box sx={s.catline}>
            <Box sx={s.categories}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  sx={s.chip(activeCategory === cat)}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </Box>
            <Button onClick={() => navigate('/panel/combinations/add')} sx={s.addBtn} startIcon={<AddIcon />}>
              Добавить
            </Button>
          </Box>

          {loading ? (
            <Box sx={s.loadingBox}>
              <CircularProgress />
            </Box>
          ) :
            filteredOutfits.length === 0 ? (
              <EmptyOutfits />
            ) : (
              <Box sx={s.grid}>
                {filteredOutfits.map((outfit: IOutfit) => (
                  <OutfitCard key={outfit.id} outfit={outfit} />
                ))}
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default CombinationsPage;