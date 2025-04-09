"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { SettingsContext } from "../context/SettingsContext"

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext)
  const { theme, language, setTheme, setLanguage, translations } = useContext(SettingsContext)

  const handleNameChange = (e) => {
    updateUser({ name: e.target.value })
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value)
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{translations.settings}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">{translations.profile}</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              {translations.name}
            </label>
            <input
              type="text"
              id="name"
              value={user?.name || ""}
              onChange={handleNameChange}
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              {translations.email}
            </label>
            <input type="email" id="email" value={user?.email || ""} readOnly className="form-control bg-gray-100" />
            <small className="text-gray-500">Email cannot be changed</small>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-1">
              {translations.role}
            </label>
            <input type="text" id="role" value={user?.role || ""} readOnly className="form-control bg-gray-100" />
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">{translations.preferences}</h2>
          <div className="mb-4">
            <label htmlFor="theme" className="block mb-1">
              {translations.theme}
            </label>
            <select id="theme" value={theme} onChange={handleThemeChange} className="form-control">
              <option value="light">{translations.lightTheme}</option>
              <option value="dark">{translations.darkTheme}</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block mb-1">
              {translations.language}
            </label>
            <select id="language" value={language} onChange={handleLanguageChange} className="form-control">
              <option value="en">{translations.english}</option>
              <option value="ru">{translations.russian}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
