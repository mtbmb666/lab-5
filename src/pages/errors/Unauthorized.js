"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { SettingsContext } from "../../context/SettingsContext"

const Unauthorized = () => {
  const { translations } = useContext(SettingsContext)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-6">{translations.unauthorized}</h2>
        <p className="mb-6">{translations.unauthorizedMessage}</p>
        <Link to="/login" className="btn btn-primary">
          {translations.login}
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
