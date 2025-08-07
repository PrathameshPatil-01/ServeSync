import { createSlice } from '@reduxjs/toolkit';
import { fetchSchedule, fetchWorkingHours, updateWorkingHours, blockTimeSlot } from './scheduleThunks';

const initialState = {
  schedule: [],
  workingHours: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearScheduleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Schedule
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch schedule';
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
        state.error = action.payload || 'Failed to fetch working hours';
      })
      // Update Working Hours
      .addCase(updateWorkingHours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkingHours.fulfilled, (state, action) => {
        state.loading = false;
        state.workingHours = action.payload; // Assuming payload is the updated list
      })
      .addCase(updateWorkingHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update working hours';
      })
      // Block Time Slot
      .addCase(blockTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockTimeSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule.push(action.payload); // Add the new blocked slot
      })
      .addCase(blockTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to block time slot';
      });
  },
});

export const { clearScheduleError } = scheduleSlice.actions;
export default scheduleSlice.reducer;
