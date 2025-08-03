import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] px-6">
      <div className="max-w-md text-center bg-[#0f0f0f] p-10 rounded-2xl shadow-xl">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold text-gray-300 mb-2">Oops! Page not found</h1>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
