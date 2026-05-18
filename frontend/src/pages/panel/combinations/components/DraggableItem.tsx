import { Box, Typography } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import type { IItem } from '../../../../redux/types/dashboard';

interface DraggableItemProps {
    item: IItem;
    isSelected: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, isSelected }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `source-${item.id}`,
        data: { item, from: 'panel' },
    });

    const imageUrl = item.image_no_bg_url || item.image_url;

    return (
        <Box
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            sx={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                opacity: isDragging ? 0.5 : 1,
                border: isSelected ? '2px solid #487886' : '1px solid #E0E0E0',
                borderRadius: '8px',
                backgroundColor: isSelected ? '#D8F8FE' : '#FFFFFF',
                textAlign: 'center',
                cursor: 'grab',
                p: '8px',
                '&:hover': { borderColor: '#487886' },
                touchAction: 'none',
                position: isDragging ? 'relative' : 'static',
                zIndex: isDragging ? 1000 : 1,
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {imageUrl ? (
                <img
                    src={`http://localhost:3000${imageUrl}`}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px' }}
                />
            ) : (
                <Typography sx={{ fontSize: '1.5rem' }}>👕</Typography>
            )}
            <Typography sx={{ fontSize: '0.7rem', color: '#3E2723', mt: '4px', fontWeight: 500 }}>
                {item.name}
            </Typography>
        </Box>
    );
};

export default DraggableItem;