import './Results.scss';
import FilmCard from '../FilmCard/FilmCard';

const Results = ({ films }) => {
  return (
    <section className='Results'>
      {films.map(film => {
        return <FilmCard film={film} isNominated={false} nominateHandler={()=>{}} removeHandler={()=>{}} />
      })}
    </section>
  )
}

export default Results;