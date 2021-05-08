import FilmNomination from '../FilmNomination/FilmNomination';
import config from '../../config';
import './Nominations.scss';

const Nominations = ({ films, removeNomination, nominationCount }) => {
  return (
    <section className='Nominations'>
      <h2 className='Nominations__heading'>
        Nominations 
        <span className='Nominations__count'>{`${nominationCount}/${config.NOMINATION_LIMIT}`}</span>
      </h2>
      <div className='Nominations__films'>
        {films.length > 0 
          ? films.map((film, i) => <FilmNomination key={"nom-" + film.imdbID + i} film={film} removeHandler={removeNomination} />) 
          : <h2 className='Nominations__none'>You haven't nominated any films yet.</h2>
        }
      </div>
    </section>
  )
}

export default Nominations;