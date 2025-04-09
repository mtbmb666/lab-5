"use client"

import { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import { SettingsContext } from "./context/SettingsContext"

// Pages
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProjectDetails from "./pages/ProjectDetails"
import Settings from "./pages/Settings"
import NotFound from "./pages/errors/NotFound"
import Unauthorized from "./pages/errors/Unauthorized"
import ServerError from "./pages/errors/ServerError"
import Layout from "./components/Layout"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

const App = () => {
  const { theme, language } = useContext(SettingsContext)

  return (
    <div className={`app ${theme}`} lang={language}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
