import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignUp } from '../service/LoginService';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const onClickSignUp = async (event) => {
    event.preventDefault();
    handleSignUp(id, pw);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(id, pw);
      alert('로그인 성공!');
    } catch (error) {
      console.log(error, 'error');

      alert(error.message);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user && navigate('/admin');
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='p-4 bg-white shadow-md rounded-lg'>
        <h1 className='text-xl w-full text-center font-semibold mb-4'>
          {isLoginView ? '로그인' : '회원가입'}
        </h1>

        <form className='flex flex-col space-y-4'>
          <input
            type='text'
            id='email'
            placeholder='Email'
            value={id}
            onChange={(event) => setId(event.target.value)}
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={pw}
            onChange={(event) => setPw(event.target.value)}
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={isLoginView ? handleLogin : onClickSignUp}
            className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'
          >
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
          <button
            type='button'
            onClick={toggleView}
            className='p-1 mt-2 text-sm text-blue-500'
          >
            {isLoginView ? 'Create account' : 'Back to login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
