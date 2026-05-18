import { Box, Typography, Avatar } from '@mui/material';

interface ProfileHeaderProps {
    displayName: string;
    email: string;
    birthday?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ displayName, email, birthday }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '2px solid #487886',
                borderRadius: '12px',
                p: '16px',
                flex: 1,
                maxWidth: '400px',
            }}
        >
            <Avatar
                sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#487886',
                    fontSize: '1.4rem',
                }}
            >
                {displayName?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Box>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#3E2723' }}>
                    {displayName}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: '#8D6E63' }}>
                    {email}
                </Typography>
                {birthday && (
                    <Typography sx={{ fontSize: '0.8rem', color: '#8D6E63', mt: '2px' }}>
                        день рождения: {birthday.split('-').reverse().join('.')}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProfileHeader;