import { City } from '../interfaces/interfaces';
import styles from './CityItem.module.css';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
function CityItem({ city }: { city: City }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.cityName}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
    </li>
  );
}

export default CityItem;