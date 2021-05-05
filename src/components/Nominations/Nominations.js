import FilmNomination from '../FilmNomination/FilmNomination';
import './Nominations.scss';

const Nominations = ({ films }) => {
  return (
    <section className='Nominations'>
      {films.map(film => {
        return <FilmNomination film={film} removeHandler={()=>{}} />
      })}
    </section>
  )
}

export default Nominations;