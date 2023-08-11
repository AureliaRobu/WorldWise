import { useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">
            Email address
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
        </div>

        <div className={styles.row}>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>

        <div>
          <button type="button">Login</button>
        </div>
      </form>
    </main>
  );
}
