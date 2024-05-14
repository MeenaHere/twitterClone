import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "./SearchField.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Trend from "../profile/Trends";

function SearchField() {
  /* const [user, setUser] = useState([]); */
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [select, setSelect] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  /*   const UserId = localStorage.setItem("userId", id); */

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value === "") {
      setSearchData([]);
      setSelect(-1);
    }
    setIsSearchActive(value.trim() !== "");
  };

  const handleClose = () => {
    setQuery("");
    setSearchData([]);
    setSelect(-1);
    setIsSearchActive(false);
  };

  const handleKeyDown = (e) => {
    if (searchData.length > 0) {
      if (select < searchData.length) {
        if (e.key === "ArrowUp" && select > 0) {
          setSelect((prev) => prev - 1);
        } else if (e.key === "ArrowDown" && select < searchData.length - 1) {
          setSelect((prev) => prev + 1);
        } else if (e.key === "Enter" && select >= 0) {
          navigate(`/profile/${searchData[select].userId}`); // Navigate to profile page
        }
      } else {
        setSelect(-1);
      }
    }
  };
  /*   useEffect(() => {
      const fetchData = async () => {
        try {
          const dbuser = await getOneUser(id);
          setUser(dbuser);
          console.log("user", dbuser);
          if (dbuser.createdAt) {
            const [getDate] = dbuser.createdAt.split("T");
            setDate(getDate);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();
    }, [id]);
   */

  useEffect(() => {
    if (query !== "") {
      fetch(`http://localhost:4000/search/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setSearchData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [query]);

  return (
    <section className="container-right">
      <div className="search-container">
        <div className="search-input-container">
          <div className="search-icon">
            <BsSearch />
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          {query && (
            <div className="close-button">
              <BsXCircleFill onClick={handleClose} />
            </div>
          )}

          <div className="search-results">
            {isSearchActive &&
              (searchData.length > 0 ? (
                searchData.map((data, index) => (
                  <div
                    key={index}
                    className={
                      select === index
                        ? "suggestion-line active"
                        : "suggestion-line"
                    }
                    onClick={async () => {
                      try {
                        const userResponse = await axios.get(
                          `http://localhost:4000/users/${data._id}`
                        );
                        const userData = userResponse.data;
                        navigate(`/users/${userData._id}`);
                      } catch (error) {
                        console.error("Error fetching user data:", error);
                      }
                    }}
                  >
                    {data.fullName}
                  </div>
                ))
              ) : (
                <p>Try searching for people, lists, or keywords</p>
              ))}
          </div>
        </div>
      </div>

      <div>{/* Premium */}</div>
      <div>
        <Trend />
      </div>
    </section>
  );
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
