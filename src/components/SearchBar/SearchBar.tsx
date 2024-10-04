import React, { ChangeEvent } from "react";
import "./SearchBar.scss";
import searchIcon from "../../assets/icons/searchIcon.svg";

interface SearchBarProps {
  searchTerm: string;
  result: number;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  result,
  onSearchChange,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div>
      <div className="search-bar">
        <img className="search-icon" src={searchIcon} alt="search" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="SEARCH A CHARACTER.."
          className="search-input"
        />
      </div>
      <div className="result">{result} RESULTS</div>
    </div>
  );
};

export default SearchBar;
