import React, { useState } from "react";

const Search: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [input, setInput] = useState('');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(input);  // Pass the search term to parent
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter Pokémon name or ID"
        />
        <button type="submit">Search</button>
      </form>
    );
  };
  

export default Search;
