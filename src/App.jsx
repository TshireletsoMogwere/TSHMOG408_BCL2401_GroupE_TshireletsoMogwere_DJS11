import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home.jsx'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index element = {<Home />} />
    </Routes>
    </BrowserRouter>
    
  
  )
}

export default App
