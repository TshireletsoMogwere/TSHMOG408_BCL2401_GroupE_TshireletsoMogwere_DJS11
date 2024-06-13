import { BrowserRouter, Link, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Genres } from "./pages/Genres"



function App() {
 

  return (
    <BrowserRouter>
    <Routes>
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
