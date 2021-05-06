import React from 'react';
import axios from 'axios';

import './App.scss';
import CompletedBanner from './components/CompletedBanner/CompletedBanner';
import Nominations from './components/Nominations/Nominations';
import Results from './components/Results/Results';
import Search from './components/Search/Search';

const NOMINATION_LIMIT = 5;

class App extends React.Component {
  state = {
    loading: false,
    page: 1,
    searchTerms: "",
    results: [],
    nominations: [],
    showNominations: true,
    showCompleteModal: false
  }

  setLoading           = bool => this.setState({ loading: bool });
  setShowCompleteModal = bool => this.setState({ showCompleteModal: bool });
  setPage              = num => this.setState({ page: num });
  toggleNominations    = () => this.setState({ showNominations: !this.state.showNominations });
  
  removeNomination = filmId => {
    this.setState({
      nominations: this.state.nominations.filter(film => film.imdbID !== filmId)
    })
  }
  
  addNomination = film => {
    if (this.state.nominations.length >= NOMINATION_LIMIT) {
      alert(`You can only make ${NOMINATION_LIMIT} nominations.`);
      return;
    }

    this.setState({ 
      nominations: [...this.state.nominations, film] 
    });
  }

  makeSearchRequest = async searchTerms => {
    this.setLoading(true);
    const base = process.env.REACT_APP_API_URL;
    const key = process.env.REACT_APP_API_KEY;
    const url = `${base}?apikey=${key}&type=movie&page=${this.state.page}&s=${searchTerms}`;

    try {
      const response = await axios.get(url);
      console.log(response);
      
      if (response.data.Response === "True") {
        this.setState({
          results: response.data.Search,
          loading: false
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.showCompleteModal && <CompletedBanner setVisibility={this.setShowCompleteModal} />}
        <div className="App__container">
          <header className="App__header">
            <h1 className="App__logo">🎥 The Shoppies</h1>
          </header>
          <main className="App__main">
            <Search searchHandler={this.makeSearchRequest} />
            {this.state.showNominations && (
              <Nominations 
                films={this.state.nominations} 
                removeNomination={this.removeNomination} 
                nominationCount={this.state.nominations.length}
                nominationLimit={NOMINATION_LIMIT}
              />
            )}
            {!this.state.loading && (
              <Results 
                films={this.state.results} 
                addNomination={this.addNomination} 
                removeNomination={this.removeNomination}
                nominations={this.state.nominations} 
              />
            )}
          </main>
        </div>
      </div>
    );
  }
}

export default App;


function fakeFilms() {
  return [
    {
      "Title": "The Avengers",
      "Year": "2012",
      "imdbID": "tt0848228",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      "Title": "Avengers: Infinity War",
      "Year": "2018",
      "imdbID": "tt4154756",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    },
    {
      "Title": "Avengers: Endgame",
      "Year": "2019",
      "imdbID": "tt4154796",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
    },
    {
      "Title": "Avengers: Age of Ultron",
      "Year": "2015",
      "imdbID": "tt2395427",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
    },
    {
      "Title": "The Avengers",
      "Year": "1998",
      "imdbID": "tt0118661",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
    },
    {
      "Title": "Ultimate Avengers: The Movie",
      "Year": "2006",
      "imdbID": "tt0491703",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg"
    },
    {
      "Title": "Ultimate Avengers II",
      "Year": "2006",
      "imdbID": "tt0803093",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Next Avengers: Heroes of Tomorrow",
      "Year": "2008",
      "imdbID": "tt1259998",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ3NjExNjY4N15BMl5BanBnXkFtZTcwNTczODkwNQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Avengers Confidential: Black Widow & Punisher",
      "Year": "2014",
      "imdbID": "tt3482378",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTU2MDg0Njk4MF5BMl5BanBnXkFtZTgwMTY0OTIyMTE@._V1_SX300.jpg"
    },
    {
      "Title": "Avengers Grimm",
      "Year": "2015",
      "imdbID": "tt4296026",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTg5NDEzNDIyOV5BMl5BanBnXkFtZTgwODY3ODA5MzE@._V1_SX300.jpg"
    }
  ]
}