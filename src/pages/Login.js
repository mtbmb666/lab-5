"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { SettingsContext } from "../context/SettingsContext"

const Login = () => {
  const { isAuthenticated, login, error } = useContext(AuthContext)
  const { translations } = useContext(SettingsContext)
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const [loginError, setLoginError] = useState(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError(null)

    const result = await login(credentials)

    if (!result) {
      setLoginError(error || "Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <h2 className="text-2xl font-bold text-center mb-6">TaskMaster</h2>
        <h3 className="text-xl font-semibold mb-4">{translations.login}</h3>

        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{loginError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              {translations.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="user@example.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-1">
              {translations.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="••••••••"
            />
            <small className="text-gray-500 mt-1 block">Demo: user@example.com / password</small>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {translations.login}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
