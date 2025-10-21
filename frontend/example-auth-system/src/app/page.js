"use client";

import { useAuth } from '../context/AuthContext';
import Link from 'next/link'; 
import styles from './Home.module.css';

export default function HomePage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeBox}>
        {user ? (
          <>
            <h1>Hello, {user.email}</h1>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className={styles.welcomeTitle}>Welcome!</h1>
            <p className={styles.welcomeSubtitle}>Please log in or register to continue</p>
            <div className={styles.authActions}>
              <Link href="/login" className={`${styles.authButton} ${styles.loginButton}`}>
                Log in
              </Link>
              <Link href="/register" className={`${styles.authButton} ${styles.registerButton}`}>
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

