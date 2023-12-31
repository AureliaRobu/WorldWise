import { Link } from 'react-router-dom';
import { City } from '../interfaces/interfaces';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext.tsx';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
function CityItem({ city }: { city: City }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity,deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
