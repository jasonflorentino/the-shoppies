import './FilmNomination.scss';

const FilmNomination = ({ film, removeHandler }) => {
  return (
    <div className='FilmNomination'>
      <i className="fas fa-times-circle" onClick={()=>removeHandler(film.imdbID)}></i>
      <img className='FilmNomination__poster' src={film.Poster} alt={`Poster for ${film.Title}`} />
      <button className='FilmNomination__removeButton' onClick={()=>removeHandler(film.imdbID)}>Remove</button>
    </div>
  )
}

export default FilmNomination;