import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TOKEN, IMAGE_BASE_URL } from "../config";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${searchTerm}&language=en-US&page=1&with_watch_providers=337&watch_region=AU`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: TOKEN,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResults(data.results.slice(0, 5));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <ResultsDropdown>
          {searchResults.map((movie) => (
            <ResultItem key={movie.id}>
              <Link to={`/detail/${movie.id}`}>
                <MoviePoster>
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </MoviePoster>
                <MovieInfo>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieYear>
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </MovieYear>
                </MovieInfo>
              </Link>
            </ResultItem>
          ))}
        </ResultsDropdown>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px rgba(249, 249, 249, 0.2);
  }

  &::placeholder {
    color: rgba(249, 249, 249, 0.5);
  }
`;

const ResultsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: #2c2c2c;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 1000;
`;

const ResultItem = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 12px;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(249, 249, 249, 0.1);
    }
  }
`;

const MoviePoster = styled.div`
  width: 40px;
  height: 60px;
  border-radius: 2px;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MovieInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
`;

const MovieYear = styled.div`
  color: rgba(249, 249, 249, 0.6);
  font-size: 12px;
  letter-spacing: 0.5px;
`;

export default Search;
