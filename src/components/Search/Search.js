import { useState, useEffect } from 'react';

import './Search.scss';

const Search = ({ searchHandler }) => {

  const [searchTerms, setSearchTerms] = useState("");

  const handleChange = e => {
    setSearchTerms(e.target.value)
  }

  useEffect(() => {
    searchHandler(searchTerms);
  }, [searchTerms])

  return (
    <section className="Search">
      <input 
        className="Search__input" 
        type="text" 
        value={searchTerms} 
        onChange={handleChange} 
        placeholder="Type here..."
      />
      <button className="Search__clear" onClick={()=>setSearchTerms("")}>Clear</button>
    </section>
  )
}

export default Search;