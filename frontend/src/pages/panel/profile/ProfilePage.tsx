import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import WeatherWidget from './components/WeatherWidget';
import ProfileField from './components/ProfileField';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import {
    fetchProfile,
    updateProfile,
    clearUpdateSuccess,
    clearError,
} from '../../../redux/slices/profileSlice';
import type { RootState } from '../../../redux/store';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';

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
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '24px',
        mb: '32px',
        pb: '24px',
        flexWrap: 'wrap',
    },
    settingsTitle: {
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#5C4E40',
    },
    loadingBox: {
        display: 'flex',
        justifyContent: 'center',
        mt: '80px',
    },
};

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { profile, loading, error, updateSuccess } = useAppSelector(
        (state: RootState) => state.profile
    );
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    const handleDeleteAccount = async () => {
        try {
            await api.delete('/users/profile');
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            alert('Ошибка при удалении аккаунта');
        }
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (updateSuccess) {
            setTimeout(() => dispatch(clearUpdateSuccess()), 3000);
        }
    }, [updateSuccess, dispatch]);

    const handleSave = (field: string) => (value: string) => {
        const data: any = {};
        switch (field) {
            case 'name':
                data.display_name = value;
                break;
            case 'email':
                data.email = value;
                break;
            case 'password':
                data.password = value;
                break;
            case 'birthday':
                data.birthday = value;
                break;
        }
        dispatch(updateProfile(data));
    };

    if (loading && !profile) {
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

    return (
        <Box sx={styles.layout}>
            <Sidebar />
            <Box sx={styles.content}>
                <Box sx={styles.whiteBox}>
                    {/* Верхняя строка */}
                    <Box sx={styles.topRow}>
                        <ProfileHeader
                            displayName={profile?.display_name || profile?.username || 'Пользователь'}
                            email={profile?.email || ''}
                            birthday={profile?.birthday}
                        />
                        {/* <WeatherWidget /> */}
                    </Box>

                    {/* Настройки */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '20px', }}>
                        <Typography sx={styles.settingsTitle}>Настройки</Typography>
                        <EditNoteIcon sx={{ color: '#5C4E40', fontSize: '1.5rem' }} />
                    </Box>

                    {updateSuccess && (
                        <Alert severity="success" sx={{ mb: '12px' }}>Изменения сохранены!</Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mb: '12px' }} onClick={() => dispatch(clearError())}>{error}</Alert>
                    )}

                    <ProfileField
                        label="Имя"
                        value={profile?.display_name || profile?.username || ''}
                        onSave={handleSave('name')}
                    />
                    <ProfileField
                        label="Адрес электронной почты"
                        value={profile?.email || ''}
                        type="email"
                        onSave={handleSave('email')}
                    />
                    <ProfileField
                        label="Новый пароль"
                        value=""
                        type="password"
                        placeholder="Введите новый пароль"
                        placeholder2="Повторите новый пароль"
                        onSave={handleSave('password')}
                    />
                    <ProfileField
                        label="Дата рождения"
                        value={profile?.birthday || ''}
                        type="date"
                        onSave={handleSave('birthday')}
                    />
                    < Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <Button
                            fullWidth
                            sx={{
                                backgroundColor: '#FED8F7',
                                color: '#7E4886',
                                textTransform: 'none',
                                fontWeight: 600,
                                width: '50%',
                                fontSize: '0.9rem',
                                borderRadius: '20px',
                                px: '20px',
                                py: '10px',
                                mt: '12px',
                                '&:hover': { backgroundColor: '#f5c8f0' },
                            }}
                            onClick={handleLogout}
                        >
                            Выйти из аккаунта
                        </Button>
                        <Button
                            fullWidth
                            sx={{
                                backgroundColor: 'transparent',
                                color: '#E57373',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                width: '50%',
                                borderRadius: '20px',
                                px: '20px',
                                py: '10px',
                                mt: '12px',
                                border: '1px solid #E57373',
                                '&:hover': {
                                    backgroundColor: '#FFF5F5',
                                    borderColor: '#EF5350',
                                },
                            }}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Удалить аккаунт
                        </Button>
                        <Dialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            PaperProps={{
                                sx: {
                                    borderRadius: '16px',
                                    p: '8px',
                                },
                            }}
                        >
                            <DialogTitle sx={{ fontWeight: 600, color: '#3E2723' }}>
                                Удаление аккаунта
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ color: '#5C4E40' }}>
                                    Вы уверены, что хотите удалить аккаунт? Все ваши предметы, комбинации и данные будут безвозвратно удалены. Это действие нельзя отменить.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ p: '16px', gap: '8px' }}>
                                <Button
                                    onClick={() => setDeleteDialogOpen(false)}
                                    sx={{
                                        color: '#8D6E63',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    onClick={handleDeleteAccount}
                                    sx={{
                                        backgroundColor: '#E57373',
                                        color: '#fff',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: '20px',
                                        px: '20px',
                                        '&:hover': { backgroundColor: '#EF5350' },
                                    }}
                                >
                                    Удалить
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;