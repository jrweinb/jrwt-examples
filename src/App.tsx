import { useState } from 'react'
import './App.css'

const CORRECT_PASSWORD = 'warranty'

type TabKey = 'moodboard' | 'information-architecture' | 'wireframes' | 'hi-fi-design' | 'user-flows'

type TabInfo = {
  key: TabKey
  label: string
  embedUrl: string
  description: string
  logo: 'giftpass' | 'roil'
}

const TABS: TabInfo[] = [
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('giftpass_auth') === 'true'
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<TabKey>('moodboard')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password === CORRECT_PASSWORD) {
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
          <h1 className="login-title">JRWT Process</h1>
          <p className="login-subtitle">Enter password to see process examples</p>
          
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

  const currentTab = TABS.find(tab => tab.key === activeTab) || TABS[0]

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-logo">
          <img src="/jrw-logo.svg" alt="JRW" className="header-logo-img" />
        </div>
      </header>

      <main className="main-content">
        <section className="intro-section">
          <h1 className="page-title">JRWT Process</h1>
          <p className="intro-text">
            This page features some selected designs and diagrams from the JRWT design and development process. Select an asset to view the embedded Figma files. You can zoom in and pan the page to get a better look.
          </p>
        </section>

        <nav className="tab-navigation">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`tab-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="tab-description">
          <img 
            src={currentTab.logo === 'giftpass' ? '/gp-logo.svg' : '/roil-logo.svg'} 
            alt={currentTab.logo === 'giftpass' ? 'Gift Pass' : 'Roil'} 
            className={`tab-logo ${currentTab.logo === 'roil' ? 'roil-logo' : ''}`}
          />
          <p className="tab-description-text">{currentTab.description}</p>
        </section>

        <section className="figma-section">
          <iframe
            key={activeTab}
            src={currentTab.embedUrl}
            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
            width="100%"
            height="800"
            allowFullScreen
            title={`Gift Pass - ${currentTab.label}`}
          />
        </section>
      </main>
    </div>
  )
}

export default App
