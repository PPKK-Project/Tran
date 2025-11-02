import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/main/Header'
import './index.css'
import Planning from './components/main/Planning'
import Warning from './components/main/Warning'
import Place from './components/main/Place'
import Footer from './components/main/Footer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <Planning />
    <Warning />
    <Place />
    <Footer />
  </React.StrictMode>,
)
