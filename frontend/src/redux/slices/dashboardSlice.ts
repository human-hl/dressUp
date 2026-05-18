import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { ITip, IOutfit, IItem } from '../types/dashboard';

interface DashboardState {
    tips: ITip[];
    outfits: IOutfit[];
    items: IItem[];
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    tips: [],
    outfits: [],
    items: [],
    loading: false,
    error: null,
};

// Моки для fallback
const mockTips: ITip[] = [
    { id: 1, title: 'как правильно выбрать шляпу?', description: 'учитывайте форму лица и сезон', type: 'tip' },
    { id: 2, title: 'какой цвет самый важный?', description: 'базовые оттенки спасают любой образ', type: 'ad' },
    { id: 3, title: 'шарфик не просто тепло', description: 'аксессуар, который меняет всё', type: 'tip' },
    { id: 4, title: 'с чем носить белую рубашку', description: '10 беспроигрышных сочетаний', type: 'tip' },
    { id: 5, title: 'базовый гардероб на осень', description: 'must-have вещи для стильных образов', type: 'ad' },
    { id: 6, title: 'как сочетать принты', description: 'правила, которые можно нарушать', type: 'tip' },
    { id: 7, title: 'уход за кожаной обувью', description: 'простые советы для долгой службы', type: 'tip' },
    { id: 8, title: 'идеальные джинсы', description: 'как найти свою пару на любой фигуре', type: 'ad' },
    { id: 9, title: 'стиль для офиса', description: 'деловой дресс-код без скуки', type: 'tip' },
];

const mockOutfits: IOutfit[] = [
    { id: 1, user_id: 1, name: 'Повседневный', category: 'Повседневные',  },
    { id: 2, user_id: 1, name: 'Спортивный', category: 'Спорт',  },
    { id: 3, user_id: 1, name: 'Деловой', category: 'Деловые',  },
    { id: 4, user_id: 1, name: 'Вечерний', category: 'Вечерние',  },
    { id: 5, user_id: 1, name: 'Летний', category: 'Сезонные',  },
];

const mockItems: IItem[] = [
    { id: 1, user_id: 1, name: 'Худи розовое' },
    { id: 2, user_id: 1, name: 'Джинсы синие' },
    { id: 3, user_id: 1, name: 'Кроссовки белые' },
    { id: 4, user_id: 1, name: 'Шарф серый' },
];

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const [outfitsRes, itemsRes] = await Promise.all([
                api.get('/outfits'),
                api.get('/items'),
            ]);

            return {
                tips: mockTips, // ← всегда моки для советов
                outfits: outfitsRes.data?.length > 0 ? outfitsRes.data.slice(0, 5) : mockOutfits,
                items: itemsRes.data?.length > 0 ? itemsRes.data.slice(0, 4) : mockItems,
            };
        } catch {
            return {
                tips: mockTips,
                outfits: mockOutfits,
                items: mockItems,
            };
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.tips = action.payload.tips || [];
                state.outfits = action.payload.outfits || [];
                state.items = action.payload.items || [];
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dashboardSlice.reducer;