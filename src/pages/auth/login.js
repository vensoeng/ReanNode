import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import profile from '../../assets/img/logo192.png';
import { Eye, EyeSlash, ArrowRight } from 'iconsax-reactjs';
import { API_URL, setAuthStorage, isAuthenticated } from '../../utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setAuthStorage({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user
      });

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main-login'>
      <form className='main df-s' onSubmit={handleSubmit}>
        {/* this is for block text  */}
        <div className='row row-blog-text'>
          <div className='box'>
            <h2>*</h2>
            <h1>
              សូមស្វាគមន៍<br />
              យើងនៅទីនេះដើម្បីអ្នករាល់គ្នា!
            </h1>
            <blockquote>
              <p>រីករាយក្នុងការជួបអ្នកម្តងទៀត! សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នកដើម្បីចូលប្រើប្រាសគណនី។</p>
            </blockquote>
          </div>
        </div>
        {/* this is for block input  */}
        <div className='row row-form'>
          <div className='box'>
            {/* this is profile  */}
            <div className='main-pr'>
              <div className='pr'>
                <div className='img over-h icon'>
                  <img className='img-c' src={profile} alt='About' width='200' />
                </div>
              </div>
              <div className='pr-sub'>
                <blockquote>
                  <h2>ចូលគណនី</h2>
                  <p>សូមបំពេញព័ត៌មានការចូលប្រើប្រាសរបស់អ្នកដើម្បីបន្តរ</p>
                </blockquote>
              </div>
            </div>
            {error && (
              <div className='form-error' style={{ color: '#dc2626', marginTop: '1rem' }}>
                {error}
              </div>
            )}
            {/* this is form txt*/}
            <div className='maim-form'>
              <div className='fbox'>
                {/* txt list  */}
                <div className='txt-main'>
                  <div className='lb'>
                    <label htmlFor='email'>គណនីអ៊ីមែល</label>
                  </div>
                  <div className='txt-box df-s'>
                    <div className='txt-ni'>
                      <input
                        className=''
                        id='email'
                        type='email'
                        placeholder='Example@gmail.com'
                        name='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* txt list  */}
                <div className='txt-main'>
                  <div className='lb'>
                    <label htmlFor='password'>ពាក្យសម្ងាត់</label>
                  </div>
                  <div className='txt-box df-s'>
                    <div className='txt'>
                      <input
                        className=''
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        name='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <div
                      className='txt-i curs-p'
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      role='button'
                    >
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </div>
                  </div>
                </div>
                <div className='txt-action'>
                  <a href='/service'>ភ្លេចពាក្យសម្ងាត់?</a>
                </div>
              </div>
            </div>
            {/* this is form footer  */}
            <div className='form-foot'>
              <div className='ff-box'>
                <div className='ff-action'>
                  <button type='submit' disabled={loading}>
                    {loading ? 'កំពុងចូល...' : 'ចូលគណនី'}
                  </button>
                </div>
                <div className='ff-info'>
                  <blockquote>
                    មិនទាន់មានគណនី?
                    <a href='/service' className='df-s'>បង្កើតគណនី <ArrowRight /></a>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
