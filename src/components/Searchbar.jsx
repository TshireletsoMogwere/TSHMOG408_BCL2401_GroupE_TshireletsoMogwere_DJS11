import React, {useState, useEffect} from "react";
import  imageSearch from "../assets/images/loupe.png"

function SearchBar() {
    const [search, setSearch] = useState('')
    const [showInput, setShowInput] = useState(false);

    
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                setShowInput(false);
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchClick = () => {
        setShowInput(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        Opensearch(search);
    };

    return (
        <form className="search-name" onSubmit={handleSearch}>
            {showInput && (
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={search}
                    onChange={handleInputChange}
                />
            )}
            <button type="button" className="search-button" onClick={handleSearchClick}>
                <img src={imageSearch} className="search-button-img" alt="Search" />
            </button>
            {showInput && (
                <button type="submit" className="submit-button">
                    Search
                </button>
            )}
        </form>
    );
}



export default SearchBar