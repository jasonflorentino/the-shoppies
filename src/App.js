import React from 'react';
import axios from 'axios';

import CompletedBanner from './components/CompletedBanner/CompletedBanner';
import Nominations from './components/Nominations/Nominations';
import Results from './components/Results/Results';
import Loading from './components/Loading/Loading';
import Search from './components/Search/Search';
import Error from './components/Error/Error';
import config from './config';
import './App.scss';

export const defaultState = { loading: false,
                              error: true,
                              errorMessage: config.DEFAULT_MESSAGE,
                              page: 1,
                              lastSearch: "",
                              results: [],
                              totalResults: "",
                              nominations: [],
                              showCompleteModal: true }

class App extends React.Component {
  prevState = JSON.parse(localStorage.getItem("appState"));

  state = this.prevState || defaultState;

  resetPageNum         =   () => this.setState({ page: 1});
  setLoading           = bool => this.setState({ loading: bool });
  setShowCompleteModal = bool => this.setState({ showCompleteModal: bool });
  
  changePage = num => {
    this.setState(
      { page: this.state.page + num }, 
      () => this.makeSearchRequest(this.state.lastSearch)
    )
  };
  
  removeNomination = filmId => {
    this.setState({
      showCompleteModal: true,
      nominations: this.state.nominations.filter(film => film.imdbID !== filmId)
    }, this.saveAppState)
  }
  
  addNomination = film => {
    if (this.state.nominations.length >= config.NOMINATION_LIMIT) {
      alert(`You can only make ${config.NOMINATION_LIMIT} nominations. Please remove one before adding another.`);
      return;
    }

    this.setState({ 
      nominations: [...this.state.nominations, film] 
    }, this.saveAppState);
  }

  saveAppState = () => {
    localStorage.setItem("appState", JSON.stringify(this.state));
  }

  makeSearchRequest = async searchTerms => {
    this.setState({
      lastSearch: searchTerms,
      loading: true
    })

    const base = process.env.REACT_APP_API_URL;
    const key  = process.env.REACT_APP_API_KEY;
    const url  = `${base}?apikey=${key}&type=movie&page=${this.state.page}&s=${searchTerms}`;

    try {
      const response = await axios.get(url);
      if (this.state.lastSearch !== searchTerms) return; // Request is old
      if (response.data.Response === "True") {
        this.setState({
          results: response.data.Search,
          totalResults: response.data.totalResults,
          loading: false,
          error: false,
        })
      }
      else {
        this.displayError(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  displayError = response => {
    const errors = ["Too many results.", "Movie not found!"];
    let message;
    
    if (errors.includes(response.Error)) {
      message = response.Error;
    }
    else if (response.Error === "Incorrect IMDb ID.") {
      // No search terms provided
      message = config.DEFAULT_MESSAGE;
    }
    else {
      message = "Uh oh! Something else went wrong.";
    }

    this.setState({
      loading: false,
      error: true,
      errorMessage: message,
      results: [],
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.showCompleteModal && 
          this.state.nominations.length === 5 && 
          <CompletedBanner setVisibility={this.setShowCompleteModal} />
        }
        <div className="App__container">
          <header className="App__header">
            <h1 className="App__logo">🎥 The Shoppies</h1>
          </header>
          <main className="App__main">
            <Search searchHandler={this.makeSearchRequest} resetPageNum={this.resetPageNum} />
            <Nominations 
              films={this.state.nominations} 
              removeNomination={this.removeNomination} 
              nominationCount={this.state.nominations.length}
              nominationLimit={config.NOMINATION_LIMIT}
            />
            {
              this.state.loading ? <Loading /> : 
              this.state.error   ? <Error message={this.state.errorMessage} /> :
              (<Results 
                films={this.state.results} 
                addNomination={this.addNomination} 
                removeNomination={this.removeNomination}
                nominations={this.state.nominations} 
                totalResults={this.state.totalResults}
                pageNum={this.state.page}
                changePage={this.changePage}
              />)
            }
          </main>
        </div>
      </div>
    );
  }
}

export default App;