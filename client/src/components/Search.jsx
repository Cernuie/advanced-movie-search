import React, { useState } from "react";

export default function Search(props) {

  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleInputChange}
        type="text"
      />
      <input 
      onClick={callSearchFunction}
      type="submit"
      value="SEARCH"
      />
    </form>
  );
}