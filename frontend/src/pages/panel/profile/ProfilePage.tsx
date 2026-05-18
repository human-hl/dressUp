import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
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
    const { profile, loading, error, updateSuccess } = useAppSelector(
        (state: RootState) => state.profile
    );

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
                        <WeatherWidget />
                    </Box>

                    {/* Настройки */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '20px' ,}}>
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
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;