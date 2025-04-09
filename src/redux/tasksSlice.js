import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import tasksData from "../assets/data/tasks.json"

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return tasksData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to add a new task
export const addTask = createAsyncThunk("tasks/addTask", async (task, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to update a task
export const updateTask = createAsyncThunk("tasks/updateTask", async (task, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return task
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to delete a task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return taskId
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to reorder tasks
export const reorderTasks = createAsyncThunk(
  "tasks/reorderTasks",
  async ({ taskId, source, destination }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { taskId, source, destination }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Add task
      .addCase(addTask.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks.push(action.payload)
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded"
        const index = state.tasks.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = state.tasks.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Reorder tasks
      .addCase(reorderTasks.fulfilled, (state, action) => {
        const { taskId, destination } = action.payload
        const taskIndex = state.tasks.findIndex((t) => t.id === taskId)

        if (taskIndex !== -1) {
          state.tasks[taskIndex].status = destination.droppableId
        }
      })
  },
})

export default tasksSlice.reducer
