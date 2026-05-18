import { Card, Box, CardContent, Typography } from "@mui/material";
import type { IItem } from "../../../../redux/types/dashboard";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
    item: IItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const navigate = useNavigate();
    const imageUrl = item.image_no_bg_url || item.image_url;

    return (
        <Card
            onClick={() => navigate(`/panel/items/${item.id}`)}
            sx={{
                borderRadius: '12px',
                border: '2px solid #487886',
                boxShadow: 'none',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)' },
            }}
        >
            {/* Фото */}
            <Box
                sx={{
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    overflow: 'hidden',
                }}
            >
                {imageUrl ? (
                    <img
                        src={`http://localhost:3000${imageUrl}`}
                        alt={item.name}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain', // ← не обрезает
                            padding: '8px',
                        }}
                    />
                ) : (
                    <Typography sx={{ fontSize: '3rem' }}>👕</Typography>
                )}
            </Box>

            {/* Название */}
            <CardContent sx={{ p: '10px !important', textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 600, color: '#3E2723', fontSize: '0.9rem' }}>
                    {item.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ItemCard;