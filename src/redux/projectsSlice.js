import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import projectsData from "../assets/data/projects.json"

// Async thunk to fetch projects (simulating API call)
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return projectsData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to add a new project
export const addProject = createAsyncThunk("projects/addProject", async (project, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to update a project
export const updateProject = createAsyncThunk("projects/updateProject", async (project, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return project
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to delete a project
export const deleteProject = createAsyncThunk("projects/deleteProject", async (projectId, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return projectId
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Add project
      .addCase(addProject.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.projects.push(action.payload)
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded"
        const index = state.projects.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.projects[index] = action.payload
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.projects = state.projects.filter((p) => p.id !== action.payload)
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default projectsSlice.reducer
