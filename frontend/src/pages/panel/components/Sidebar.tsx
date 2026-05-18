import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../redux/hooks/redux';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { Box, Typography, Avatar, } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import type { RootState } from '../../../redux/store';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const menuItems = [
    { label: 'Главная страница', path: '/panel', icon: <NewspaperIcon /> },
    { label: 'Комбинации', path: '/panel/combinations', icon: <LightbulbIcon /> },
    { label: 'Предметы', path: '/panel/items', icon: <DoorSlidingIcon /> },
    { label: 'Советы', path: '/panel/recommendations', icon: <AutoAwesomeIcon /> },
];

const styles = {
    sidebar: {
    width: 280,
    backgroundColor: '#DACCBE',
    color: '#8D6E63',
    pt: 3,
    pl: '12px',
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    flexShrink: 0,
    height: '100vh',
    position: 'sticky',
    top: 0,
},
    userBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        mb: '12px',
        p: '12px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
    },
    avatar: {
        width: 44,
        height: 44,
        mb: 1,
        backgroundColor: '#8D6E63',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    userName: {
        fontWeight: 600,
        fontSize: '0.9rem',
        color: '#3E2723',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    userEmail: {
        fontSize: '0.75rem',
        color: '#BCAAA4',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
    },
    menuItem: (active: boolean) => ({
        py: 1.5,
        px: 2,
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: active ? '#fff' : 'transparent',
        color: active ? '#8D6E63' : '#8D6E63',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#DACCBE',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '28px',
        },
    }),

    // Бургер-кнопка
    burgerBtn: {
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        top: 12,
        left: 12,
        zIndex: 1200,
        backgroundColor: '#8D6E63',
        color: '#fff',
        width: 40,
        height: 40,
        '&:hover': { backgroundColor: '#6D4C41' },
    },

    // Нижний бар (только мобилка)
    bottomBar: {
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: '12px',
        left: '20px',
        right: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        justifyContent: 'space-around',
        alignItems: 'center',
        py: '12px',
        zIndex: 1100,
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
    },
    bottomItem: (active: boolean) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? '#5C4E40' : '#8D6E63',
        cursor: 'pointer',
        p: '10px',
        borderRadius: '14px',
        transition: 'all 0.2s',
        '& .MuiSvgIcon-root': { fontSize: '1.75rem' },
    }),
    bottomAvatar: {
        width: 32,
        height: 32,
        backgroundColor: '#8D6E63',
        fontSize: '0.9rem',
        cursor: 'pointer',
    },
    bottomLabel: {
        fontSize: '0.6rem',
        fontWeight: 500,
    },
};

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(selectCurrentUser);
    const profile = useAppSelector((state: RootState) => state.profile.profile);
    const [mobileOpen, setMobileOpen] = useState(false);

    const userBlock = (
        <Box sx={{ ...styles.userBox, cursor: 'pointer', '&:hover': { opacity: 0.85 } }} onClick={() => { navigate('/panel/profile'); setMobileOpen(false); }}>
            <Avatar sx={styles.avatar}>
                {profile?.display_name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Box sx={styles.userInfo}>
                <Typography sx={styles.userName}>
                    {profile?.display_name || user?.username || 'Пользователь'}
                </Typography>
                <Typography sx={styles.userEmail}>
                    {user?.email || ''}
                </Typography>
            </Box>
        </Box>
    );

    const menuBlock = (
        <Box sx={styles.menu}>
            {menuItems.map((item) => (
                <Box
                    key={item.path}
                    sx={styles.menuItem(location.pathname === item.path)}
                    onClick={() => { navigate(item.path); setMobileOpen(false); }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {item.icon}
                        <span>{item.label}</span>
                    </Box>
                </Box>
            ))}
        </Box>
    );

    return (
        <>
            {/* Десктопный сайдбар */}
            <Box sx={styles.sidebar}>
                {userBlock}
                <Typography sx={styles.userEmail}>Меню</Typography>
                {menuBlock}
            </Box>



            {/* Нижний бар */}
            <Box sx={styles.bottomBar}>
                {menuItems.map((item) => (
                    <Box
                        key={item.path}
                        sx={styles.bottomItem(location.pathname === item.path)}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                    </Box>
                ))}
                {/* Профиль */}
                <Avatar
                    sx={styles.bottomAvatar}
                    onClick={() => navigate('/panel/profile')}
                >
                    {profile?.display_name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
            </Box>
        </>
    );
};

export default Sidebar;