import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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


  useEffect(() => {
    if (query !== "") {
      fetch(`https://twitter-clone-backend-jdzg.onrender.com/search?q=${query}`)
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
                          `https://twitter-clone-backend-jdzg.onrender.com/users/${data._id}`
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