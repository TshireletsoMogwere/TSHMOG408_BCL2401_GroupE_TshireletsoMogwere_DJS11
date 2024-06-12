import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Bottombar from './components/Bottombar.jsx'
import Home from './components/Home.jsx'
import SearchBar from './components/Searchbar.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Bottombar />
    <Home />
    <SearchBar />
  </React.StrictMode>,
)
