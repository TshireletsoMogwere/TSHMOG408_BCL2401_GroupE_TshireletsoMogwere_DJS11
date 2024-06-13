import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Bottombar from './components/Bottombar.jsx'
import SearchBar from './components/Searchbar.jsx'
import Previews from './components/Previews.jsx'
import Genres from './components/Genres.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Genres />
    <Previews />
    <SearchBar />
    <Bottombar />
  </React.StrictMode>,
)
