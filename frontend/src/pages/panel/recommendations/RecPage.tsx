import React, { useEffect, useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Sidebar from '../components/Sidebar';
import TipCard from './components/TipCard';
import EmptyTips from './components/EmptyTips';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { fetchTips } from '../../../redux/slices/tipsSlice';
import type { ITip } from '../../../redux/types/dashboard';
import type { RootState } from '../../../redux/store';

const shuffleArray = (array: ITip[]): ITip[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  // Основная сетка: слева (шире) и справа (уже)
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
    gap: '16px',
  },
  // Левая колонка
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  // Большой блок слева (по высоте = 3 маленьких справа)
  bigBlock: {
    minHeight: '300px',
  },
  // Сетка 2×2 для маленьких слева
  smallGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '16px',
    minHeight: '200px',
  },
  // Правая колонка — в столбик
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  rightCard: {
    flex: 1,
    minHeight: '80px',
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    mt: '80px',
  },
};

const RecommendationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tips, loading } = useAppSelector((state: RootState) => state.tips);

  useEffect(() => {
    dispatch(fetchTips());
  }, [dispatch]);

  const shuffledTips = useMemo(() => shuffleArray(tips), [tips]);

  if (loading) {
    return (
      <Box sx={styles.layout}>
        <Sidebar />
        <Box sx={styles.content}>
          <Box sx={styles.whiteBox}>
            <Box sx={styles.loadingBox}>
              <CircularProgress />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  if (shuffledTips.length === 0) {
    return (
      <Box sx={styles.layout}>
        <Sidebar />
        <Box sx={styles.content}>
          <Box sx={styles.whiteBox}>
            <Box sx={styles.header}>
              <Typography sx={styles.title}>Советы</Typography>
            </Box>
            <EmptyTips />
          </Box>
        </Box>
      </Box>
    );
  }

  // Индексы для распределения советов
  let tipIndex = 0;
  const leftBlocks: React.ReactNode[] = [];
  const rightCards: React.ReactNode[] = [];

  // Чередуем: большой слева + 3 справа, потом 4 маленьких слева + 2 справа
  while (tipIndex < shuffledTips.length) {
    // Большой блок слева (1 совет) + 3 справа
    if (tipIndex < shuffledTips.length) {
      leftBlocks.push(
        <Box key={`big-${tipIndex}`} sx={styles.bigBlock}>
          <TipCard tip={shuffledTips[tipIndex]} variant="wide" />
        </Box>
      );
      tipIndex++;
    }

    // 3 маленьких справа
    for (let i = 0; i < 3 && tipIndex < shuffledTips.length; i++) {
      rightCards.push(
        <Box key={`right-${tipIndex}`} sx={styles.rightCard}>
          <TipCard tip={shuffledTips[tipIndex]} variant="small" />
        </Box>
      );
      tipIndex++;
    }

    // 4 маленьких слева (2×2) + 2 справа
    if (tipIndex < shuffledTips.length) {
      const smallTips = shuffledTips.slice(tipIndex, tipIndex + 4);
      leftBlocks.push(
        <Box key={`small-${tipIndex}`} sx={styles.smallGrid}>
          {smallTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} variant="small" />
          ))}
        </Box>
      );
      tipIndex += smallTips.length;
    }

    // 2 маленьких справа
    for (let i = 0; i < 2 && tipIndex < shuffledTips.length; i++) {
      rightCards.push(
        <Box key={`right-${tipIndex}`} sx={styles.rightCard}>
          <TipCard tip={shuffledTips[tipIndex]} variant="small" />
        </Box>
      );
      tipIndex++;
    }
  }

  return (
    <Box sx={styles.layout}>
      <Sidebar />
      <Box sx={styles.content}>
        <Box sx={styles.whiteBox}>
          <Box sx={styles.header}>
            <Typography sx={styles.title}>Советы</Typography>
          </Box>

          <Box sx={styles.mainGrid}>
            {/* Левая колонка */}
            <Box sx={styles.leftColumn}>{leftBlocks}</Box>

            {/* Правая колонка */}
            <Box sx={styles.rightColumn}>{rightCards}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendationsPage;