import './Results.scss';
import FilmCard from '../FilmCard/FilmCard';

const Results = ({ films, addNomination, removeNomination, nominations }) => {

  const isNominated = (film) => {
    const noms = [...nominations];
    
    while (noms.length > 0) {
      const nom = noms.pop();
      if (film.imdbID === nom.imdbID) return true;
    }
    return false;
  }

  return (
    <section className='Results'>
      {films.map(film => {
        return <FilmCard 
                  film={film} 
                  isNominated={isNominated(film)} 
                  nominateHandler={addNomination} 
                  removeHandler={removeNomination} 
                />
      })}
    </section>
  )
}

export default Results;