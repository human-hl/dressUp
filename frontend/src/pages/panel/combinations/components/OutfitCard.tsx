import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { API_URL } from '../../../../api/axios';

interface OutfitCardProps {
    outfit: {
        id: number;
        name?: string;
        items?: {
            item?: {
                image_no_bg_url?: string;
                image_url?: string;
            };
        }[];
    };
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit }) => {
    const navigate = useNavigate();

    // Берём первые 4 предмета для мини-превью
    const previewItems = outfit.items?.slice(0, 4) || [];

    return (
        <Card
            onClick={() => navigate(`/panel/combinations/${outfit.id}`)}
            sx={{
                borderRadius: '12px',
                border: '2px solid #487886',
                boxShadow: 'none',
                backgroundColor: '#FFFFFF',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                padding: '8px',
                height: '160px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#ffffff' },
            }}
        >
            {previewItems.length > 0 ? (
                previewItems.map((oi, index) => {
                    const img = oi.item?.image_no_bg_url || oi.item?.image_url;
                    return (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            {img ? (
                                <img
                                    src={`${API_URL}${img}`}
                                    alt=""
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            ) : (
                                <Typography sx={{ fontSize: '1.2rem' }}>👕</Typography>
                            )}
                        </Box>
                    );
                })
            ) : (
                <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', color: '#BCAAA4' }}>
                    Пусто
                </Typography>
            )}
        </Card>
    );
};

export default OutfitCard;