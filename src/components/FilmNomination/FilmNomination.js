import './FilmNomination.scss';

const FilmNomination = ({ film, removeHandler }) => {
  return (
    <div className='FilmNomination'>
      <i class="fas fa-times-circle"></i>
      <img className='FilmNomination__poster' src={film.Poster} alt={`Poster for ${film.Title}`} />
      <button className='FilmNomination__removeButton'>Remove</button>
    </div>
  )
}

export default FilmNomination;