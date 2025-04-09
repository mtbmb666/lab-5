"use client"

import { createContext, useReducer, useEffect } from "react"

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

// Create the context
export const AuthContext = createContext()

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: JSON.parse(savedUser),
      })
    }
  }, [])

  // Login function
  const login = async (credentials) => {
    dispatch({ type: "LOGIN_REQUEST" })

    // Mock API call (replace with real authentication later)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple validation (in real app this would be a server call)
      if (credentials.email === "user@example.com" && credentials.password === "password") {
        const user = {
          id: "1",
          name: "Demo User",
          email: credentials.email,
          role: "manager",
        }

        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(user))

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        })

        return true
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      })
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  // Update user function
  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData }
    localStorage.setItem("user", JSON.stringify(updatedUser))

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: updatedUser,
    })
  }

  // Context value
  const value = {
    ...state,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
