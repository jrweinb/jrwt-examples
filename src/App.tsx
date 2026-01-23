import { useState } from 'react'
import './App.css'

const CORRECT_PASSWORD = ['warranty', 'lawncare']

type RouteKey = 'examples' | 'process'

type ProcessTabKey = 'moodboard' | 'information-architecture' | 'wireframes' | 'hi-fi-design' | 'user-flows'

type ProcessTabInfo = {
  key: ProcessTabKey
  label: string
  embedUrl: string
  description: string
  logo: 'giftpass' | 'roil'
}

type ExampleTabKey = 'example-video-1' | 'example-video-2'

type ExampleTabInfo = {
  key: ExampleTabKey
  label: string
  videoUrl: string
  description: string
}

const PROCESS_TABS: ProcessTabInfo[] = [
  {
    key: 'moodboard',
    label: 'MOODBOARD',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=0-1&embed-host=share',
    description: 'A collection of visual inspiration, color palettes, and design references that guided the aesthetic direction of Gift Pass.',
    logo: 'giftpass'
  },
  {
    key: 'information-architecture',
    label: 'INFORMATION ARCHITECTURE',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=1-30&embed-host=share',
    description: 'The structural blueprint showing how content and features are organized within the Gift Pass experience.',
    logo: 'giftpass'
  },
  {
    key: 'wireframes',
    label: 'WIREFRAMES',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=1-1593&embed-host=share',
    description: 'Low-fidelity layouts that establish the foundational structure and user flow for Gift Pass screens.',
    logo: 'giftpass'
  },
  {
    key: 'hi-fi-design',
    label: 'HI-FI DESIGN',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=2-1654&embed-host=share',
    description: 'Polished, pixel-perfect designs showcasing the final visual direction and UI components for Gift Pass.',
    logo: 'giftpass'
  },
  {
    key: 'user-flows',
    label: 'DATA FLOWS',
    embedUrl: 'https://embed.figma.com/board/8WJf9UKzZ98dHXNZscAYE9/Flow?node-id=0-1&embed-host=share',
    description: 'Detailed diagrams mapping out the data flow and control flow of the Roil application.',
    logo: 'roil'
  }
]

const EXAMPLE_TABS: ExampleTabInfo[] = [
  {
    key: 'example-video-1',
    label: 'Bond Trading Platform',
    videoUrl: 'https://jrwt-examples.s3.ap-southeast-1.amazonaws.com/JRWT-Example1.mp4',
    description: 'Platform built for a finance client to trade bonds.'
  },
  {
    key: 'example-video-2',
    label: 'Advertising Platform',
    videoUrl: 'https://jrwt-examples.s3.ap-southeast-1.amazonaws.com/JRWT-Example2.mp4',
    description: 'Platform built for a client to manage outdoor advertising campaigns.'
  }
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('giftpass_auth') === 'true'
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeRoute, setActiveRoute] = useState<RouteKey>('examples')
  const [activeProcessTab, setActiveProcessTab] = useState<ProcessTabKey>('moodboard')
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTabKey>('example-video-1')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (CORRECT_PASSWORD.includes(password)) {
      sessionStorage.setItem('giftpass_auth', 'true')
      setIsAuthenticated(true)
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img src="/jrw-logo.svg" alt="JRW" className="login-logo-img" />
          </div>
          <h1 className="login-title">JRWT Examples</h1>
          <p className="login-subtitle">Enter password to view examples and process work</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
              autoFocus
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Unlock
            </button>
          </form>
        </div>
        <div className="login-backdrop"></div>
      </div>
    )
  }

  const currentProcessTab = PROCESS_TABS.find(tab => tab.key === activeProcessTab) || PROCESS_TABS[0]
  const currentExampleTab = EXAMPLE_TABS.find(tab => tab.key === activeExampleTab) || EXAMPLE_TABS[0]

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-logo">
          <img src="/jrw-logo.svg" alt="JRW" className="header-logo-img" />
        </div>
        <nav className="header-nav">
          <button
            type="button"
            className={`tab-pill ${activeRoute === 'examples' ? 'active' : ''}`}
            onClick={() => setActiveRoute('examples')}
          >
            Examples
          </button>
          <button
            type="button"
            className={`tab-pill ${activeRoute === 'process' ? 'active' : ''}`}
            onClick={() => setActiveRoute('process')}
          >
            Process
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeRoute === 'examples' ? (
          <>
            <section className="intro-section">
              <h1 className="page-title">JRWT Examples</h1>
              <p className="intro-text">
                A curated set of video examples that highlight storytelling, flow, and visual polish.
                Select a video to preview the placeholder walkthroughs.
              </p>
            </section>

            <nav className="tab-navigation">
              {EXAMPLE_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`tab-pill ${activeExampleTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveExampleTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <section className="tab-description">
              <p className="tab-description-text">{currentExampleTab.description}</p>
            </section>

            <section className="video-section">
              <video
                key={activeExampleTab}
                className="video-embed"
                src={currentExampleTab.videoUrl}
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
              />
            </section>
          </>
        ) : (
          <>
            <section className="intro-section">
              <h1 className="page-title">JRWT Process</h1>
              <p className="intro-text">
                This page features selected designs and diagrams from the JRWT design and development process.
                Select an asset to view the embedded Figma files. You can zoom in and pan the page to get a better look.
              </p>
            </section>

            <nav className="tab-navigation">
              {PROCESS_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`tab-pill ${activeProcessTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveProcessTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <section className="tab-description">
              <img 
                src={currentProcessTab.logo === 'giftpass' ? '/gp-logo.svg' : '/roil-logo.svg'} 
                alt={currentProcessTab.logo === 'giftpass' ? 'Gift Pass' : 'Roil'} 
                className={`tab-logo ${currentProcessTab.logo === 'roil' ? 'roil-logo' : ''}`}
              />
              <p className="tab-description-text">{currentProcessTab.description}</p>
            </section>

            <section className="figma-section">
              <iframe
                key={activeProcessTab}
                src={currentProcessTab.embedUrl}
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                width="100%"
                height="800"
                allowFullScreen
                title={`Gift Pass - ${currentProcessTab.label}`}
              />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
