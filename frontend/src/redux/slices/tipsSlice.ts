import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { ITip} from '../types/dashboard';

interface TipsState {
    tips: ITip[];
    loading: boolean;
    error: string | null;
}

const initialState: TipsState = {
    tips: [],
    loading: false,
    error: null,
};

export const fetchTips = createAsyncThunk(
    'tips/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/tips');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки советов');
        }
    }
);

const tipsSlice = createSlice({
    name: 'tips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTips.fulfilled, (state, action) => {
                state.loading = false;
                state.tips = action.payload;
            })
            .addCase(fetchTips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default tipsSlice.reducer;