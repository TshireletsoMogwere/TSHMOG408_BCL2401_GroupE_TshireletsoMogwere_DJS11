import { BrowserRouter, Link, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Genres } from "./pages/Genres"
import { History } from "./pages/History"
import { Library } from "./pages/Library"
import { Login } from "./pages/Login"
import Modal from "./components/Modal"
import { ShowList } from "./pages/Shows"

function App() {
  
  return (
    <BrowserRouter>
    <header>
      <h1>Podcasts</h1>
    </header>

<nav-bar>
      <nav>
        <Link to = "/home">Home</Link>
        <Link to = "/genres">Discover</Link>
        <Link to = "/favourites">Library</Link>
        <Link to = "/last played">History</Link>
        <Link to = "/login">Login</Link>
        <Link to = "/shows">Shows</Link>
      </nav>
      </nav-bar>

      
    <Routes>
      <Route path="/home" element = {<Home />} />
      <Route path="/favourites" element = {<Library />} />
      <Route path="/last played" element = {<History />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/modal" element = {<Modal />} />
      <Route path="/genres" element = {<Genres />} />
      <Route path="/shows" element = {<ShowList />} />
    </Routes>
    
    </BrowserRouter>
  )
}


export default App
