import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Planning from './components/main/Planning'
import Warning from './components/main/Warning'
import Place from './components/main/Place'
import Footer from './components/main/Footer'
import MyMapComponent from './MyMapComponent'
import { APIProvider } from '@vis.gl/react-google-maps'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <MyMapComponent />
    </APIProvider>
    <Planning />
    <Warning />
    <Place />
    <Footer />
  </React.StrictMode>,
)
