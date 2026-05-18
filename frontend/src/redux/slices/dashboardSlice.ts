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

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const [tipsRes, outfitsRes, itemsRes] = await Promise.all([
                api.get('/tips'),
                api.get('/outfits'),
                api.get('/items'),
            ]);

            return {
                tips: tipsRes.data || [],
                outfits: outfitsRes.data || [],
                items: itemsRes.data || [],
            };
        } catch (err: any) {
            return rejectWithValue('Ошибка загрузки данных');
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