import { useState } from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';

interface ProfileFieldProps {
    label: string;
    value: string;
    type?: 'text' | 'password' | 'date' | 'email';
    placeholder?: string;
    placeholder2?: string;
    onSave: (value: string) => void;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
    label,
    value,
    type = 'text',
    placeholder,
    placeholder2,
    onSave,
}) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [editValue2, setEditValue2] = useState('');

    const handleEdit = () => {
        setEditValue(type === 'password' ? '' : value);
        setEditValue2('');
        setEditing(true);
    };

    const handleSave = () => {
        if (type === 'password' && editValue !== editValue2) {
            alert('Пароли не совпадают');
            return;
        }
        onSave(editValue);
        setEditing(false);
    };

    return (
        <>
            <Box sx={{ mb: '16px' }}>
                {/* Лейбл сверху */}
                <Typography sx={{ fontSize: '0.85rem', color: '#5C4E40', fontWeight: 600, mb: '6px' }}>
                    {label}
                </Typography>

                {editing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <TextField
                            size="small"
                            type={type}
                            placeholder={placeholder}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    border: '1px solid #487886',
                                },
                            }}
                        />
                        {type === 'password' && (
                            <TextField
                                size="small"
                                type="password"
                                placeholder={placeholder2 || 'Повторите пароль'}
                                value={editValue2}
                                onChange={(e) => setEditValue2(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        border: '1px solid #487886',
                                    },
                                }}
                            />
                        )}
                        
                        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <Button
                                size="small"
                                sx={{ color: '#8D6E63', textTransform: 'none', fontSize: '0.8rem' }}
                                onClick={() => setEditing(false)}
                            >
                                Отмена
                            </Button>
                            <Button
                                size="small"
                                sx={{
                                    backgroundColor: '#487886',
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    borderRadius: '20px',
                                    px: '16px',
                                    '&:hover': { backgroundColor: '#3b646f' },
                                }}
                                onClick={handleSave}
                            >
                                Изменить
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '0.95rem', color: '#3E2723' }}>
                            {type === 'password'
                                ? '********'
                                : type === 'date' && value
                                    ? new Date(value).toLocaleDateString('ru-RU')
                                    : value || '-'}
                        </Typography>
                        <Button
                            size="small"
                            sx={{
                                color: '#487886',
                                textTransform: 'none',
                                fontSize: '0.8rem',
                                '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                            }}
                            onClick={handleEdit}
                        >
                            Изменить
                        </Button>
                    </Box>
                )}
            </Box>
            <Divider sx={{ my: '8px' }} />
        </>
    );
};

export default ProfileField;