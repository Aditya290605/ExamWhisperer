import React from 'react'

export default function ChatWidget() {
  const openAgent = () => {
    if (window.OmnidimensionWidget) {
      window.OmnidimensionWidget.open()
    } else {
      alert('Assistant is loading, please wait...')
    }
  }

  return (
    <button
      onClick={openAgent}
      className="bg-green-500 hover:bg-green-600 shadow-lg mt-6 px-5 py-2 rounded-xl font-semibold text-white transition duration-300"
    >
      💬 Ask Your Question
    </button>
  )
}
