import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { IOutfit } from '../types/dashboard';

interface OutfitsState {
    outfits: IOutfit[];
    loading: boolean;
    error: string | null;
}

const initialState: OutfitsState = {
    outfits: [],
    loading: false,
    error: null,
};

export const fetchOutfits = createAsyncThunk(
    'outfits/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/outfits');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки');
        }
    }
);

export const createOutfit = createAsyncThunk(
    'outfits/create',
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await api.post('/outfits', data);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка создания');
        }
    }
);

export const deleteOutfit = createAsyncThunk(
    'outfits/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await api.delete(`/outfits/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка удаления');
        }
    }
);

const outfitsSlice = createSlice({
    name: 'outfits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOutfits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOutfits.fulfilled, (state, action) => {
                state.loading = false;
                state.outfits = action.payload;
            })
            .addCase(fetchOutfits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createOutfit.fulfilled, (state, action) => {
                state.outfits.unshift(action.payload);
            })
            .addCase(deleteOutfit.fulfilled, (state, action) => {
                state.outfits = state.outfits.filter(o => o.id !== action.payload);
            });
    },
});

export default outfitsSlice.reducer;