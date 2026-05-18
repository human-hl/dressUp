import { Box, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import CanvasItemComponent from './CanvasItem';
import type { CanvasItem as CanvasItemType } from '../AddCombinationPage';

interface CanvasProps {
    items: CanvasItemType[];
    onRemove: (dndId: string) => void;
    onResize: (dndId: string, width: number, height: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ items, onRemove, onResize }) => {
    const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });

    return (
        <Box
            ref={setNodeRef}
            sx={{
                flex: '1 1 50%',
                minHeight: '500px',
                border: isOver ? '2px solid #487886' : '2px dashed #487886',
                borderRadius: '12px',
                backgroundColor: isOver ? '#F5FAFB' : '#FFFFFF',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s',
            }}
        >
            {items.length === 0 ? (
                <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#BCAAA4', fontSize: '1rem', pointerEvents: 'none' }}>
                    Перетащите вещи сюда
                </Typography>
            ) : (
                items.map((item) => (
                    <CanvasItemComponent
                        key={item.dndId}
                        item={item}
                        onRemove={onRemove}
                        onResize={onResize}
                    />
                ))
            )}
        </Box>
    );
};

export default Canvas;