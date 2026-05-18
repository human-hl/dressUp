import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDraggable } from '@dnd-kit/core';
import { useState, useCallback } from 'react';
import type { CanvasItem as CanvasItemType } from '../AddCombinationPage';

interface CanvasItemProps {
    item: CanvasItemType;
    onRemove: (dndId: string) => void;
    onResize: (dndId: string, width: number, height: number) => void;
}

const CanvasItemComponent: React.FC<CanvasItemProps> = ({ item, onRemove, onResize }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.dndId,
        data: { item, from: 'canvas' },
    });

    const [resizing, setResizing] = useState(false);
    const imageUrl = item.image_no_bg_url || item.image_url;

    const handleResizeStart = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setResizing(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = item.width;
        const startHeight = item.height;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const newWidth = Math.max(50, startWidth + deltaX);
            const newHeight = Math.max(50, startHeight + deltaY);
            onResize(item.dndId, newWidth, newHeight);
        };

        const handleMouseUp = () => {
            setResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [item, onResize]);

    return (
        <Box
            ref={setNodeRef}
            sx={{
                position: 'absolute',
                left: `${item.position_x}px`,
                top: `${item.position_y}px`,
                width: `${item.width}px`,
                height: `${item.height}px`,
                transform: transform && !resizing ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                cursor: resizing ? 'se-resize' : isDragging ? 'grabbing' : 'grab',
                touchAction: 'none',
                zIndex: isDragging ? 9999 : item.z_index,
                opacity: isDragging ? 0.85 : 1,
            }}
        >
            {/* Контент */}
            <Box
                {...(!resizing ? listeners : {})}
                {...(!resizing ? attributes : {})}
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                }}
            >
                {imageUrl ? (
                    <img
                        src={`http://localhost:3000${imageUrl}`}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                        draggable={false}
                    />
                ) : (
                    <Typography sx={{ fontSize: '2.5rem' }}>👕</Typography>
                )}
            </Box>

            {/* Кнопка удаления */}
            <Box sx={{ position: 'absolute', top: -10, right: -10, zIndex: 100 }}>
                <IconButton
                    size="small"
                    sx={{
                        backgroundColor: '#fff',
                        border: '1px solid #E0E0E0',
                        width: 22,
                        height: 22,
                        '&:hover': { backgroundColor: '#FFEBEE' },
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.dndId);
                    }}
                >
                    <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
            </Box>

            {/* Маркер изменения размера (правый нижний угол) */}
            <Box
                onMouseDown={handleResizeStart}
                sx={{
                    position: 'absolute',
                    bottom: -6,
                    right: -6,
                    width: 14,
                    height: 14,
                    backgroundColor: '#487886',
                    borderRadius: '50%',
                    cursor: 'se-resize',
                    border: '2px solid #fff',
                    zIndex: 101,
                }}
            />
        </Box>
    );
};

export default CanvasItemComponent;