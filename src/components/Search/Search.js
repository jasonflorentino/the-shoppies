import { useState, useEffect } from 'react';

import { defaultState } from '../../App';
import config from "../../config";
import './Search.scss';

const Search = ({ searchHandler, resetPageNum }) => {

  const storedSearch = localStorage.getItem("storedSearch");
  const [searchTerms, setSearchTerms] = useState(storedSearch || "");
  const [didMount, setDidMount] = useState(false);

  const handleChange = e => {
    setSearchTerms(e.target.value);
    localStorage.setItem("storedSearch", e.target.value);
  }

  const handleClear = () => {
    setSearchTerms("");
    localStorage.setItem("storedSearch", "");
    const appState = JSON.parse(localStorage.getItem("appState")) || defaultState;
    const clearState = {...appState, 
                        results: [], 
                        error: true, 
                        errorMessage: config.DEFAULT_MESSAGE}
    localStorage.setItem("appState", JSON.stringify(clearState));
  }

  // Set flag for first render
  useEffect(() => {
    setDidMount(true);
  }, [])

  useEffect(() => {
    if (!didMount) return;
    if (didMount) resetPageNum();
    searchHandler(searchTerms);
    // eslint-disable-next-line
  }, [searchTerms])

  return (
    <section className="Search">
      <input 
        className="Search__input" 
        type="text" 
        value={searchTerms} 
        onChange={handleChange} 
        placeholder={"Star Wars"}
      />
      <button className="Search__clear" onClick={handleClear}>Clear</button>
    </section>
  )
}

export default Search;