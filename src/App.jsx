import { BrowserRouter, Link, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { Home } from "./pages/Home"
import { Library } from "./pages/Library"
import { History } from "./pages/History"
import { Login } from "./pages/Login"
import Modal from "./pages/Modal"
import { Genres } from "./pages/Genres"



function App() {
 

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/header" element = {<Header />} />
      <Route path="/home" element = {<Home />} />
      <Route path="/favourites" element = {<Library />} />
      <Route path="/last played" element = {<History />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/modal" element = {<Modal />} />
      <Route path="/genres" element = {<Genres />} />
    </Routes>
    
    <bottom-bar>
      <nav>
        <Link to = "/home">Home</Link>
        <Link to = "/genres">Genres</Link>
        <Link to = "/favourites">Library</Link>
        <Link to = "/last played">History</Link>
        <Link to = "/login">Login</Link>
      </nav>
      </bottom-bar>
    </BrowserRouter>
  )
}


export default App
