import React from 'react';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import './SearchField.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function SearchField() {

    const [query, setQuery] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [select, setSelect] = useState(-1);
    const [isSearchActive, setIsSearchActive] = useState(false);



    const handleChange = e => {
        const value = e.target.value;
        setQuery(value);
        if (value === "") {
            setSearchData([]); // Clear search results if input is empty
            setSelect(-1); // Reset selection index
        }
        setIsSearchActive(value.trim() !== "");
    };

    const handleClose = () => {
        setQuery("");
        setSearchData([]);
        setSelect(-1);
        setIsSearchActive(false);
    }
    // Function that enables search with arrow keys 
    const handleKeyDown = e => {
        if (searchData.length > 0) { // Check if there are search results
            if (select < searchData.length) {
                if (e.key === "ArrowUp" && select > 0) {
                    setSelect(prev => prev - 1)
                }
                else if (e.key === "ArrowDown" && select < searchData.length - 1) {
                    setSelect(prev => prev + 1)
                }
                else if (e.key === "Enter" && select >= 0) {
                    window.open(searchData[select].url)
                }
            } else {
                setSelect(-1)
            }
        }
    };


    useEffect(() => {

        //make sure it doesn't run for empty string
        // replace this API with your own API endpoint

        if (query !== "") {
            fetch(`http://localhost:4000/api/search?q=${query}`)
                .then(res => res.json())
                .then(data => setSearchData(data))
                .catch(error => console.error('Error fetching data:', error));
        }

    }, [query]) //useEffect will run whenever we change 'query' value


    return (
        <section className="container-right">
            <div className="search-input-container">

                <div className='search-icon'>
                    <BsSearch />
                </div>

                <input
                    className='search-input'
                    type="text"
                    placeholder='Search'
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}

                />
                {/* <button onClick={handleSearch}>Search</button> */}
                {query && (
                    <div className="close-button">
                        <BsXCircleFill onClick={handleClose} />
                    </div>
                )}

                <div className='search-results'>
                    {isSearchActive && (
                        searchData.length > 0 ? (
                            searchData.map((data, index) => (
                                <a
                                    href={data.url}
                                    key={index}
                                    target='_blank'
                                    className={select === index ? 'suggestion-line active' : 'suggestion-line'}
                                >
                                    {data.fullName}
                                </a>
                            ))
                        ) : (
                            <p>Try searching for people, lists, or keywords</p>
                        )
                    )}
                </div>

            </div>
        </section>
    )
}

export default SearchField;


// Notes: Don't forget to change to my own backend api
// just a reference
/* useEffect(() => {
    if (query !== "") {
        fetch(`/api/search?q=${query}`)
            .then(res => res.json())
            .then(data => {
                // Handle response data from your API
                setSearchData(data); // Assuming data is an array of user objects
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}, [query]); */


// Other code i might want to use

/*  const handleSearch = async () => {
     try {
         
         const response = await fetch(`/api/search?query=${query}`);
         if (!response.ok) {
             throw new Error('Failed to fetch search results');
         }
         const data = await response.json();
         setSearchResults(data); // Update search results state
     } catch (error) {
         console.error('Error searching:', error);
         setSearchResults([]); // Clear search results on error
     }
 }; */
