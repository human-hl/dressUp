import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { IItem } from '../types/dashboard';

interface ItemsState {
    items: IItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
};

// Получить все предметы
export const fetchItems = createAsyncThunk(
    'items/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/items');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки');
        }
    }
);

// Создать предмет
export const createItem = createAsyncThunk(
    'items/create',
    async (data: Partial<IItem>, { rejectWithValue }) => {
        try {
            const res = await api.post('/items', data);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка создания');
        }
    }
);

// Обновить предмет
export const updateItem = createAsyncThunk(
    'items/update',
    async ({ id, data }: { id: number; data: Partial<IItem> }, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/items/${id}`, data);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка обновления');
        }
    }
);

// Удалить предмет
export const deleteItem = createAsyncThunk(
    'items/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await api.delete(`/items/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка удаления');
        }
    }
);

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchItems
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // createItem
            .addCase(createItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            .addCase(createItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // updateItem
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((i) => i.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // deleteItem
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((i) => i.id !== action.payload);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = itemsSlice.actions;
export default itemsSlice.reducer;