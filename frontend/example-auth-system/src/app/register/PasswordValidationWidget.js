"use client";
import styles from './PasswordValidationWidget.module.css';

export default function PasswordValidationWidget({ criteria }) {
  return (
    <div className={styles.validationWidget}>
      <ul>
        <li className={criteria.length ? styles.valid : styles.invalid}>
          {criteria.length ? '✓' : '✗'} Minimum 8 characters
        </li>
        <li className={criteria.lowercase ? styles.valid : styles.invalid}>
          {criteria.lowercase ? '✓' : '✗'} One lowercase letter (a-z)
        </li>
        <li className={criteria.uppercase ? styles.valid : styles.invalid}>
          {criteria.uppercase ? '✓' : '✗'} One uppercase letter (A-Z)
        </li>
        <li className={criteria.number ? styles.valid : styles.invalid}>
          {criteria.number ? '✓' : '✗'} One number (0-9)
        </li>
        <li className={criteria.specialChar ? styles.valid : styles.invalid}>
          {criteria.specialChar ? '✓' : '✗'} One special character (!@#$%)
        </li>
      </ul>
    </div>
  );
}
