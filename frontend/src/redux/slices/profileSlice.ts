import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface ProfileData {
  id: number;
  username: string;
  display_name: string;
  email: string;
  birthday: string;
  role: string;
}

interface ProfileState {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,
};

// Получить профиль
export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/profile');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки');
    }
  }
);

// Обновить профиль
export const updateProfile = createAsyncThunk(
  'profile/update',
  async (data: {
    display_name?: string;
    email?: string;
    password?: string;
    birthday?: string;
  }, { rejectWithValue }) => {
    try {
      const res = await api.patch('/users/profile', data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка обновления');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUpdateSuccess, clearError } = profileSlice.actions;
export default profileSlice.reducer;