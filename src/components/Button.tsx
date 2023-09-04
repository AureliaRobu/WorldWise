import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: string;
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
