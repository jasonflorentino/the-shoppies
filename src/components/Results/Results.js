import './Results.scss';
import FilmCard from '../FilmCard/FilmCard';

const Results = ({ films, 
                   addNomination, 
                   removeNomination, 
                   nominations, 
                   pageNum, 
                   totalResults,
                   changePage }) => 
 {

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
      {films.map((film, i) => {
        return <FilmCard
                  key={"result-" + film.imdbID + i}
                  film={film} 
                  isNominated={isNominated(film)} 
                  nominateHandler={addNomination} 
                  removeHandler={removeNomination} 
                />
      })}
      <div className='Results__nextContainer'>
        <div className='Results__nextDetails'>
          <span className='Results__pageText'>{`Page ${pageNum} out of ${Math.ceil(totalResults/10)}`}</span>
          <div className='Results__actions'>
            {pageNum !== 1 && <button className='Results__button--prev' onClick={()=>changePage(-1)}>Previous Page</button>}
            <button className='Results__button' onClick={()=>changePage(1)}>Next Page</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Results;