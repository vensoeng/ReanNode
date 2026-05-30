// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import img from '../assets/img/logo192.png';
export default function NotFoundPage() {
  return (
    <main style={styles.container}>
        <div className='404-img mb-05' style={styles.main_img}>
            <img src={img} className='img-c' alt='profile'/>
        </div>
        {/* <h1 style={styles.errorCode}>404</h1> */}
        <h2 style={styles.title}>មិនមានទំព័រទេ</h2>
        <p style={styles.description}>
            សុំទោសផង! ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានទេ។
        </p>
        <Link to="/" style={styles.button} className='btn'>
            ត្រឡប់ទៅទំព័រដើម
        </Link>
    </main>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
    background: 'var(--sg-bgblack-01)'
  },
  main_img: {
    width: '100%',
    maxWidth: '80px',
    margin: '0 aoto',
    marginBottom: '1rem'
  },
  errorCode: {
    fontSize: '1.5rem',
    margin: 0,
    color: '#38bdf8',
  },
  title: {
    fontSize: '1.5rem',
    margin: '10px 0',
  },
  description: {
    color: '#94a3b8',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    color: 'var(--sg-bglight)',
    textDecoration: 'none',
    borderRadius: '50rem',
  }
};