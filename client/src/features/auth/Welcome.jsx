import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-indigo-600">TechNots Dashboard</span>
        </h1>
        <p className="text-slate-600 mb-10">
          Choose an option below to manage content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dash/notes"
            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all text-lg"
          >
            View Notes
          </Link>
          <Link
            to="/dash/users"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-all text-lg"
          >
            View Users
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
