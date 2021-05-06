import './FilmCard.scss';

const FilmCard = ({ film, isNominated, nominateHandler, removeHandler }) => {

  return (
    <div className='FilmCard'>
      <div className='FilmCard__container'>
        <div className='FilmCard__posterContainer'>
          <img className='FilmCard__poster' src={film.Poster} alt={`Poster for ${film.Title}`} />
        </div>
        <div className='FilmCard__infoContainer'>
          <h3 className='FilmCard__title'>{film.Title}</h3>
          <span className='FilmCard__year'>{film.Year}</span>
          {!isNominated && <button className='FilmCard__nominate' onClick={()=>nominateHandler(film)}>Nominate</button>}
          {isNominated && <button className='FilmCard__remove' onClick={()=>removeHandler(film.imdbID)}>Remove</button>}
        </div>
      </div>
    </div>
  )
}

export default FilmCard;