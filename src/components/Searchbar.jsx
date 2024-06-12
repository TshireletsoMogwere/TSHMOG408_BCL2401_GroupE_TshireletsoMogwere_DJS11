import React, {useState} from "react";
import  imageSearch from "../assets/images/loupe.png"

function SearchBar() {
    const [search, setSearch] = useState('')

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        Opensearch(search);
    };

    return (
        <form className="search-name" onSubmit = {handleSearch}>
            <input
            type = "text"
            className="search-input"
            placeholder="Search"
            value = {search}
            onChange = {handleInputChange}
            />
       <button type ="submit" className="search-button">
       <img src={imageSearch} className="search-button img" />
       </button>

       </form>
    );
};

export default SearchBar