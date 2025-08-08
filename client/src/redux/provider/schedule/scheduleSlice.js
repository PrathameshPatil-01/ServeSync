import axiosInstance from '@/api/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks for Schedule
export const fetchDailySchedule = createAsyncThunk(
  'schedule/fetchDailySchedule',
  async ({ providerId, date }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/schedules/provider/${providerId}/daily`, { params: { date } });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch daily schedule';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchWorkingHours = createAsyncThunk(
  'schedule/fetchWorkingHours',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/schedules/provider/${providerId}/working-hours`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch working hours';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateWorkingHours = createAsyncThunk(
  'schedule/updateWorkingHours',
  async ({ providerId, workingHoursData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/schedules/provider/${providerId}/working-hours`, workingHoursData);
      toast.success('Working hours updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update working hours';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const addBlockedTimeSlot = createAsyncThunk(
  'schedule/addBlockedTimeSlot',
  async ({ providerId, slotData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/schedules/provider/${providerId}/blocked-slots`, slotData);
      toast.success('Time slot blocked successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to block time slot';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteBlockedTimeSlot = createAsyncThunk(
  'schedule/deleteBlockedTimeSlot',
  async (slotId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/schedules/blocked-slots/${slotId}`);
      toast.success('Blocked time slot deleted successfully!');
      return slotId;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete blocked time slot';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Slice
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    dailySchedule: [],
    workingHours: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearScheduleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Daily Schedule
      .addCase(fetchDailySchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailySchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySchedule = action.payload;
      })
      .addCase(fetchDailySchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Working Hours
      .addCase(fetchWorkingHours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkingHours.fulfilled, (state, action) => {
        state.loading = false;
        state.workingHours = action.payload;
      })
      .addCase(fetchWorkingHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Working Hours
      .addCase(updateWorkingHours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkingHours.fulfilled, (state, action) => {
        state.loading = false;
        state.workingHours = action.payload;
      })
      .addCase(updateWorkingHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Blocked Time Slot
      .addCase(addBlockedTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlockedTimeSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySchedule.push(action.payload); // Add to daily schedule for immediate display
      })
      .addCase(addBlockedTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Blocked Time Slot
      .addCase(deleteBlockedTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedTimeSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySchedule = state.dailySchedule.filter(slot => slot.id !== action.payload);
      })
      .addCase(deleteBlockedTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearScheduleError } = scheduleSlice.actions;
export default scheduleSlice.reducer;

