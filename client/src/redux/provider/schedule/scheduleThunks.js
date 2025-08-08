import {
  addBlockedTimeSlot,
  fetchProviderSchedule,
  fetchProviderWorkingHours,
  updateProviderWorkingHours,
} from '@/services/provider/scheduleService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async ({ providerId, date }, { rejectWithValue }) => {
    try {
      const schedule = await fetchProviderSchedule(providerId, date);
      return schedule;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch schedule');
    }
  }
);

export const fetchWorkingHours = createAsyncThunk(
  'schedule/fetchWorkingHours',
  async (providerId, { rejectWithValue }) => {
    try {
      const workingHours = await fetchProviderWorkingHours(providerId);
      return workingHours;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch working hours');
    }
  }
);

export const updateWorkingHours = createAsyncThunk(
  'schedule/updateWorkingHours',
  async ({ providerId, workingHoursData }, { rejectWithValue }) => {
    try {
      const updatedHours = await updateProviderWorkingHours(providerId, workingHoursData);
      return updatedHours;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update working hours');
    }
  }
);

export const blockTimeSlot = createAsyncThunk(
  'schedule/blockTimeSlot',
  async ({ providerId, slotData }, { rejectWithValue }) => {
    try {
      const newSlot = await addBlockedTimeSlot(providerId, slotData);
      return newSlot;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to block time slot');
    }
  }
);
