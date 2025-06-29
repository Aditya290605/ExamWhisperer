import { useEffect, useState } from 'react'

export default function App() {
  const [isAgentLoaded, setIsAgentLoaded] = useState(false)

  // Inject script once
  useEffect(() => {
    const scriptId = 'omnidimension-web-widget'

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src =
        'https://backend.omnidim.io/web_widget.js?secret_key=68efff2fd9f34fa20b7eb5b3fb696dec'
      script.async = true
      document.body.appendChild(script)
    }

    // Poll until window.OmnidimensionWidget is ready
    const checkInterval = setInterval(() => {
      if (window.OmnidimensionWidget) {
        setIsAgentLoaded(true)
        clearInterval(checkInterval)
      }
    }, 500)

    return () => clearInterval(checkInterval)
  }, [])

  const openAgentFullscreen = () => {
    if (!isAgentLoaded) return alert('AI Assistant still loading. Please wait...')

    window.OmnidimensionWidget.open()

    const tryFullscreen = () => {
      const iframe = document.querySelector('iframe[src*="omnidim"]')
      if (iframe) {
        Object.assign(iframe.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          zIndex: '9999',
          border: 'none',
          borderRadius: '0',
        })

        // Optional: hide floating widget launcher if it exists
        const launcher = document.querySelector('[id^="omnidimension-launcher"]')
        if (launcher) launcher.style.display = 'none'
      } else {
        setTimeout(tryFullscreen, 2000)
      }
    }

    tryFullscreen()
  }

  return (
    <div className="flex flex-col justify-center items-center bg-black min-h-screen">
      <h1 className="mb-6 font-bold text-white text-3xl">🎓 Exam Whisper AI</h1>
      <button
        onClick={openAgentFullscreen}
        disabled={!isAgentLoaded}
        className={`px-6 py-3 rounded-xl text-white text-lg shadow-lg transition-all duration-300 ${
          isAgentLoaded
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-600 cursor-not-allowed'
        }`}
      >
        {isAgentLoaded ? '💬 Ask Your Doubt (Fullscreen)' : '🔄 Loading AI Assistant...'}
      </button>
    </div>
  )
}
